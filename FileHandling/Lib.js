FileSystem=new ActiveXObject('Scripting.FileSystemObject'); // Add this to the global namesapce

function ReadText(FileName)
    {
    try 
        {
        var Stream=new ActiveXObject('ADODB.Stream');
        Stream.Open();
        Stream.Type=2;
        Stream.Charset='UTF-8';
        Stream.LoadFromFile(FileName);
        var Text=Stream.ReadText();
        Stream.Close();
        return Text;
        }
    catch (e)
        {
        Log('ReadText failed: '+e.name);
        }
    return;
    }

function WriteText(Text,FileName)
    {
    try 
        {
        var Stream=new ActiveXObject('ADODB.Stream');
        Stream.Open();
        Stream.Type=2;
        Stream.Charset='UTF-8';
        Stream.WriteText(Text);
        Stream.SaveToFile(FileName,2);
        Stream.Close();
        return true;
        }
    catch (e)
        {
        Log('WriteText failed: '+e.name);
        }
    return false;
    }

function crc32(r) {for(var a,o=[],c=0;c<256;c++){a=c;for(var f=0;f<8;f++)a=1&a?3988292384^a>>>1:a>>>1;o[c]=a}for(var n=-1,t=0;t<r.length;t++)n=n>>>8^o[255&(n^r.charCodeAt(t))];return(-1^n)>>>0}

