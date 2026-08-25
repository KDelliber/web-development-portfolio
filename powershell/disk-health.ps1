# Disk Health Check
# Reports drive usage and flags drives with less than 15 percent free space.

Get-CimInstance Win32_LogicalDisk -Filter "DriveType=3" | ForEach-Object {
    $freePct = if ($_.Size) { [math]::Round(($_.FreeSpace / $_.Size) * 100, 1) } else { 0 }
    [PSCustomObject]@{
        Drive = $_.DeviceID
        Size_GB = [math]::Round($_.Size / 1GB, 1)
        Free_GB = [math]::Round($_.FreeSpace / 1GB, 1)
        Free_Percent = $freePct
        Status = if ($freePct -lt 15) { 'LOW SPACE' } else { 'OK' }
    }
} | Format-Table -AutoSize
