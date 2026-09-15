Add-Type -AssemblyName System.Drawing

function Optimize-Folder($folderPath) {
    $files = Get-ChildItem -Path $folderPath | Where-Object { $_.Length -gt 500KB -and ($_.Extension -match '\.jpg$|\.jpeg$|\.png$|\.JPG$') }
    Write-Host "Found $($files.Count) large files in $folderPath"
    
    $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]80)

    foreach ($f in $files) {
        try {
            $bytes = [System.IO.File]::ReadAllBytes($f.FullName)
            $ms = New-Object System.IO.MemoryStream(,$bytes)
            $img = [System.Drawing.Image]::FromStream($ms)
            
            $tempOut = "$($f.FullName).opt.jpg"
            $img.Save($tempOut, $jpegCodec, $encoderParams)
            $img.Dispose()
            $ms.Dispose()

            $newLen = (Get-Item $tempOut).Length
            if ($newLen -lt $f.Length) {
                Write-Host "Reduced $($f.Name): $([math]::Round($f.Length/1MB,2))MB -> $([math]::Round($newLen/1MB,2))MB"
                Move-Item -Force $tempOut $f.FullName
            } else {
                Remove-Item -Force $tempOut
            }
        } catch {
            Write-Host "Skipped $($f.Name): $_"
        }
    }
}

Optimize-Folder "client\dist\assets"
Optimize-Folder "admin\dist\assets"

Remove-Item -Force -ErrorAction SilentlyContinue "client-production.zip", "admin-production.zip"

Write-Host "Creating optimized client-production.zip..."
Compress-Archive -Path "client\dist\*" -DestinationPath "client-production.zip" -CompressionLevel Optimal -Force

Write-Host "Creating optimized admin-production.zip..."
Compress-Archive -Path "admin\dist\*" -DestinationPath "admin-production.zip" -CompressionLevel Optimal -Force

Get-ChildItem -Path "client-production.zip", "admin-production.zip" | Select-Object Name, @{Name="Size (MB)"; Expression={[math]::Round($_.Length/1MB, 2)}}
