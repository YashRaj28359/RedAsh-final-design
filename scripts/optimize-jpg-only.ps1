Add-Type -AssemblyName System.Drawing

function Optimize-JpgOnly($folderPath) {
    # Only touch JPGs, NEVER touch PNGs (to preserve transparency on logos)
    $files = Get-ChildItem -Path $folderPath | Where-Object { $_.Length -gt 500KB -and ($_.Extension -match '\.jpg$|\.jpeg$|\.JPG$') }
    Write-Host "Found $($files.Count) large JPG files in $folderPath"
    
    $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]85)

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

# Ensure htaccess exists in dist
$htaccessContent = @"
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
"@
Set-Content -Path "client\dist\.htaccess" -Value $htaccessContent
Set-Content -Path "admin\dist\.htaccess" -Value $htaccessContent

Optimize-JpgOnly "client\dist\assets"
Optimize-JpgOnly "admin\dist\assets"

Remove-Item -Force -ErrorAction SilentlyContinue "client-production-optimized.zip", "admin-production-optimized.zip"
