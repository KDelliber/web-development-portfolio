# Network Diagnostics
# Shows active adapters, IP configuration, DNS settings, and basic connectivity tests.

Get-NetIPConfiguration | Where-Object {$_.IPv4Address} | ForEach-Object {
    [PSCustomObject]@{
        Interface = $_.InterfaceAlias
        IPv4 = $_.IPv4Address.IPAddress
        Gateway = $_.IPv4DefaultGateway.NextHop
        DNS = ($_.DNSServer.ServerAddresses -join ', ')
    }
} | Format-Table -AutoSize

Write-Host "`nConnectivity Tests" -ForegroundColor Cyan
$targets = @('127.0.0.1','8.8.8.8','google.com')
foreach ($target in $targets) {
    $ok = Test-Connection -ComputerName $target -Count 1 -Quiet
    "{0,-15} {1}" -f $target, $(if($ok){'PASS'}else{'FAIL'})
}
