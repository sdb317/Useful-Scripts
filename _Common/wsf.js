var LogFile;
var LogFileName = WScript.ScriptFullName + '.log';
LogFile = FileSystem.CreateTextFile(LogFileName);

function Log(Message) {
    if (typeof LogFile != 'undefined')
        LogFile.WriteLine(Message);
    else
        WScript.Echo(Message);
}

function Output(Message) {
    WScript.Echo(Message);
}

function Popup(Message, Title, Type) {
    var Shell = new ActiveXObject('WScript.Shell');
    var State = Shell.Popup(Message, 0, Title, Type);
    if (State != 2) // Not 'Cancel'
        return true;
    else
        return false;
}

function GetCurrentFolder() {
    return WScript.ScriptFullName.substr(0, WScript.ScriptFullName.lastIndexOf('\\')) + '\\';
}

