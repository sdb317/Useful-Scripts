///////////////////////////////////////////////////////////
// File        : CFileParser.js
// Created     : 01/18/12
// Description : 
//
//    var FileParser=new CFileParser();
//    FileParser.FileIterator
//        (
//        'C:\\Folder',
//        function(FileName)
//            {
//            if (FileName.indexOf('.txt')!=-1) return true; else return false;
//            },
//        function(FileName)
//            {
//            FileParser.RecordIterator
//                (
//                'C:\\Folder\\'+FileName,
//                function(RecordText)
//                    {
//                    if (RecordText.indexOf('Hello world!')!=-1) return true; else return false;
//                    },
//                function(RecordText)
//                    {
//                    Log(RecordText);
//                    return true;
//                    }
//                );
//            }
//        );
//
//

function CFileParser()
{
// Inheritance


// Operations
    this.FileIterator=_FileIterator;
    function _FileIterator(PathName, Qualifies, Action) 
        {
        try
            {
            var Folder=FileSystem.GetFolder(PathName);
			var FileList='';
            var FilesCollection=new Enumerator(Folder.Files);
            for (;!FilesCollection.atEnd();FilesCollection.moveNext())
                {
                var File=FilesCollection.item();
                if (Qualifies(File.Name)) // Does the name match the criteria specified?
                    {
                    if (FileList.length>0) // Use a separator but not for the first
						FileList+=';';
					FileList+=File.Name;
                    }
                }
            FileList=FileList.split(';');
			FileList=FileList.sort();
			for (var i=0;i<FileList.length;i++)
				{
                var FileName=FileList[i];
                Action(FileName);
				}
            }
        catch (e)
            {
            LogEvent('FileIterator: '+e.description);
            }
        }

    this.RecordIterator=_RecordIterator;
    function _RecordIterator(FileName, Qualifies, Action) 
        {
        try
            {
            var File=FileSystem.GetFile(FileName);
            if (File!=null)
                {
                var Stream=File.OpenAsTextStream(1,-2);
                while (!Stream.AtEndOfStream)
                    {
                    var RecordText=Stream.ReadLine();
                    if (Qualifies(RecordText)) // Does the text match the criteria specified?
                        {
                        Action(RecordText);
                        }
                    }
                Stream.Close();
                }
            }
        catch (e)
            {
            LogEvent('RecordIterator: '+e.description);
            }
        }


// Attributes

};
