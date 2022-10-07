' cscript //nologo StayAwake.vbs
Set WshShell = WScript.CreateObject("WScript.Shell")
While True
   WScript.Sleep 60000
   WshShell.SendKeys "{F15}"
Wend
