Add-Type -AssemblyName System.Drawing
$img1 = [System.Drawing.Image]::FromFile((Resolve-Path "assets/images/4p5p6p_top_circle.png").Path)
Write-Output "4p5p6p_top_circle.png: $($img1.Width) x $($img1.Height)"
$img1.Dispose()
$img2 = [System.Drawing.Image]::FromFile((Resolve-Path "assets/images/4p5p6p_btm_circle.png").Path)
Write-Output "4p5p6p_btm_circle.png: $($img2.Width) x $($img2.Height)"
$img2.Dispose()
