Add-Type -AssemblyName System.Drawing

function Create-SocialBanner([string]$srcPath, [string]$dstPath) {
    $src = [System.Drawing.Image]::FromFile($srcPath)
    $banner = New-Object System.Drawing.Bitmap(1200, 630, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($banner)
    $g.Clear([System.Drawing.Color]::White)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    $maxW = 950
    $maxH = 480
    $ratio = [Math]::Min($maxW / $src.Width, $maxH / $src.Height)
    $newW = [int]($src.Width * $ratio)
    $newH = [int]($src.Height * $ratio)
    $posX = [int]((1200 - $newW) / 2)
    $posY = [int]((630 - $newH) / 2)

    $g.DrawImage($src, $posX, $posY, $newW, $newH)
    $g.Dispose()
    $src.Dispose()

    $banner.Save($dstPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $banner.Dispose()
    Write-Host "Created banner at $dstPath"
}

Create-SocialBanner (Join-Path $PSScriptRoot "..\client\public\logos\redash-films-logo.png") (Join-Path $PSScriptRoot "..\client\public\logos\redash-films-banner.png")
Create-SocialBanner (Join-Path $PSScriptRoot "..\client\public\logos\redash-main-logo.png") (Join-Path $PSScriptRoot "..\client\public\logos\redash-main-banner.png")
Create-SocialBanner (Join-Path $PSScriptRoot "..\client\public\logos\redash-agency-logo.png") (Join-Path $PSScriptRoot "..\client\public\logos\redash-agency-banner.png")

Copy-Item (Join-Path $PSScriptRoot "..\client\public\logos\redash-*-banner.png") (Join-Path $PSScriptRoot "..\admin\public\logos\")
Copy-Item (Join-Path $PSScriptRoot "..\client\public\logos\redash-*-banner.png") (Join-Path $PSScriptRoot "..\server\uploads\")
Remove-Item (Join-Path $PSScriptRoot "..\test.png") -ErrorAction SilentlyContinue
