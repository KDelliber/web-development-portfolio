# System Information Report
# Collects common workstation details for help desk troubleshooting.

$os = Get-CimInstance Win32_OperatingSystem
$computer = Get-CimInstance Win32_ComputerSystem
$cpu = Get-CimInstance Win32_Processor | Select-Object -First 1

[PSCustomObject]@{
    ComputerName = $env:COMPUTERNAME
    LoggedOnUser = $env:USERNAME
    Windows = $os.Caption
    Version = $os.Version
    CPU = $cpu.Name
    RAM_GB = [math]::Round($computer.TotalPhysicalMemory / 1GB, 2)
    Uptime = (Get-Date) - $os.LastBootUpTime
} | Format-List
