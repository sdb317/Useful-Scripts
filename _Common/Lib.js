FileSystem = new ActiveXObject('Scripting.FileSystemObject'); // Add this to the global namesapce

function LoadTextUTF8(FileName) {
    try {
        var Stream = new ActiveXObject('ADODB.Stream');
        Stream.Open();
        Stream.Type = 2; // adTypeText
        Stream.Charset = 'UTF-8';
        Stream.LoadFromFile(FileName);
        var Data = Stream.ReadText();
        Stream.Close();
        return Data;
    }
    catch (e) {
        Log('LoadTextUTF8 failed: ' + e.name);
    }
    return;
}

function SaveTextUTF8(FileName, Data) {
    try {
        var Stream = new ActiveXObject('ADODB.Stream');
        Stream.Open();
        Stream.Type = 2; // adTypeText
        Stream.Charset = 'UTF-8';
        Stream.WriteText(Data);
        var StreamNoBOM = new ActiveXObject('ADODB.Stream');
        StreamNoBOM.Open();
        StreamNoBOM.Type = 1; // adTypeBinary
        Stream.Position = 3; // Skip BOM
        Stream.CopyTo(StreamNoBOM);
        StreamNoBOM.SaveToFile(FileName, 2);
        StreamNoBOM.Close();
        Stream.Close();
        return true;
    }
    catch (e) {
        Log('SaveTextUTF8 failed: ' + e.name);
    }
    return false;
}

