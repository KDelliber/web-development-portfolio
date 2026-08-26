# Service Check
# Reviews a few services commonly relevant to workstation support.

$services = @('Dnscache','Dhcp','Spooler','wuauserv')

$results = foreach ($name in $services) {
    $svc = Get-Service -Name $name -ErrorAction SilentlyContinue

    if ($svc) {
        [PSCustomObject]@{
            Service   = $svc.DisplayName
            Name      = $svc.Name
            Status    = $svc.Status
            StartType = $svc.StartType
        }
    }
    else {
        [PSCustomObject]@{
            Service   = $name
            Name      = $name
            Status    = 'Not Found'
            StartType = '-'
        }
    }
}

$results | Format-Table -AutoSize

