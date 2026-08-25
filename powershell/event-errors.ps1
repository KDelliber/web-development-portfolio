# Recent Event Errors
# Pulls recent critical and error events from the System log.

$since = (Get-Date).AddHours(-24)

Get-WinEvent -FilterHashtable @{LogName='System'; StartTime=$since; Level=1,2} -ErrorAction SilentlyContinue |
    Select-Object -First 20 TimeCreated, Id, ProviderName, LevelDisplayName, Message |
    Format-Table -Wrap -AutoSize
