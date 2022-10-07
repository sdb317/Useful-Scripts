/*

Author: Simon D. Bell
Usage: cscript.exe //nologo RenameSpam.js

The script files connects to Outlook and removes the 'spam' warning from the subject of all selected messages in the Inbox.

*/

var olMailItem=0;
var olFolderInbox=6;

var Spam='*****SPAM***** ';

function getTime(val,delimiter) /* Get time string HHMMSS, with optional delimiter */
    {
    if (delimiter==undefined)
        delimiter='';
    if (val==undefined)
        val=new Date();
    if (typeof(val)!='date')
        val=new Date(val);
    return (val.getHours()<10?'0'+val.getHours().toString():val.getHours().toString())+delimiter+((val.getMinutes())<10?'0'+(val.getMinutes()).toString():(val.getMinutes()).toString())+delimiter+(val.getSeconds()<10?'0'+val.getSeconds().toString():val.getSeconds().toString());
    }

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
                //var Filter='[Subject] = "'+Spam+'"';
                //var InboxItems=Inbox.Items.Restrict(Filter);
                var InboxItems=Inbox.Items;
                for (var i=0;i<InboxItems.Count;i++) // Go through e-mail list...
                    {
                    var Item=InboxItems.Item(i+1); // 1-based
                    if (Item.Subject.indexOf(Spam)==0) // Look for 'Subject' designated as spam
                        {
                        WScript.Echo(Item.Subject);
                        Item.Subject=Item.Subject.substr(Spam.length);
                        Item.Save(); // Will be in 'Drafts'
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

