function Save(FileName,Data)
    {
    try 
        {
        var Stream=new ActiveXObject('ADODB.Stream');
        Stream.Open();
        Stream.Type=2;
        Stream.Charset='UTF-8';
        Stream.WriteText(Data);
        Stream.SaveToFile(FileName,2);
        Stream.Close();
        return true;
        }
    catch (e)
        {
        WScript.Echo('Save failed: '+e.name);
        }
    return false;
    }

