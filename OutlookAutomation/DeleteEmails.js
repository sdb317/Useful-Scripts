/*

Author: Simon D. Bell
Usage: cscript.exe //nologo DeleteEmails.js

The script files connects to Outlook and deletes all messages in the Inbox from a specified sender.

*/

var olMailItem=0;
var olFolderInbox=6;

var tigar='tigar.support@wipo.int';
var noreply='noreply@wipo.int';
try
    {
    var WShell=WScript.CreateObject('WScript.Shell');
    var Application=null;
    try
        {
        Application=GetObiect('','Outlook.Application');
        }
    catch (e)
        {
        Application=new ActiveXObject('Outlook.Application');
        }
    if (Application!=null)
        {
        var Namespace=Application.GetNamespace('MAPI');
        if (Namespace!=null)
            {
            var Inbox=Namespace.getDefaultFolder(olFolderInbox);
            if (Inbox!=null)
                {
                //var Filter="[ReceivedTime] >= Today"; // Only look at today's e-mails
                //var InboxItems=Inbox.Items.Restrict(Filter);
                var InboxItems=Inbox.Items;
                for (var i=InboxItems.Count;i>=1;i--) // Go through e-mail list...
                    {
                    try
                        {
                        var Item=InboxItems.Item(i); // 1-based
                        if (Item.Sender.PropertyAccessor)
                            {
                            var Sender=Item.Sender.PropertyAccessor.GetProperty('http://schemas.microsoft.com/mapi/proptag/0x39FE001E');
                            if ((Sender.toLowerCase()==tigar)||(Sender.toLowerCase()==noreply))
                                {
                                WScript.Echo('Deleting message from: '+Sender);
                                Item.Delete();
                                }
                            }
                        }
                    catch (e)
                        {
                        //WScript.Echo('main: '+e.description);
                        }
                    }
                Inbox=null;
                }
            Namespace=null;
            }
        Application=null;
        }
    }
catch (e)
    {
    WScript.Echo('main: '+e.description);
    }
CollectGarbage(); // Force destruction of 'Outlook.Application'

