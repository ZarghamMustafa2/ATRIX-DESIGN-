Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Bitmap]::FromFile("$PWD\images\logo.png")

# Make exactly white transparent
$img.MakeTransparent([System.Drawing.Color]::White)

# Also handle near-white for better blending (simple threshold loop)
# Note: Doing this pixel by pixel in PS is slow, but for a logo it's acceptable
$width = $img.Width
$height = $img.Height

for ($y = 0; $y -lt $height; $y++) {
    for ($x = 0; $x -lt $width; $x++) {
        $pixel = $img.GetPixel($x, $y)
        if ($pixel.R -gt 240 -and $pixel.G -gt 240 -and $pixel.B -gt 240) {
            # Make near-white fully transparent
            $transparent = [System.Drawing.Color]::FromArgb(0, $pixel.R, $pixel.G, $pixel.B)
            $img.SetPixel($x, $y, $transparent)
        }
    }
}

$imgPath = "$PWD\images\logo_transparent.png"
$img.Save($imgPath, [System.Drawing.Imaging.ImageFormat]::Png)
$img.Dispose()
Write-Output "Done"
