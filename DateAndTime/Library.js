
function Log(Message) // 'Output' should be defined as WScript.Echo, window.alert, etc, etc
    {
    try
        {
        if (Output!=undefined)
            Output(Message);
        }
    catch (e)
        {
        if (Output!=undefined)
            Output('alert: '+e.description);
        }
    }

function LogEvent(Message) // Logs a message with a timestamp prefix
    {
    Log(getDate(undefined,'-')+' '+getTime(undefined,':')+' - '+Message);
    }

function parsePaddedInt(val) /* Handle case of leading zeros */
    {
    while (val.charAt(0)=='0')
        val=val.substring(1,val.length);
    if (val.length>0)
        return parseInt(val);
    else
        return 0;
    }

function getDate(val,delimiter) /* Get date string YYYYMMDD, with optional delimiter */
    {
    if (delimiter==undefined)
        delimiter='';
    if (val==undefined)
        val=new Date();
    if (typeof(val)!='date')
        val=new Date(val);
    return val.getFullYear()+delimiter+((val.getMonth()+1)<10?'0'+(val.getMonth()+1).toString():(val.getMonth()+1).toString())+delimiter+(val.getDate()<10?'0'+val.getDate().toString():val.getDate().toString());
    }

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

function getNextWorkingDate(val,delimiter) /* Get date string YYYYMMDD, with optional delimiter */
    {
    if (val==undefined)
        val=new Date(); // Start at now
    if (typeof(val)=='date')
        val=new Date(val);
    do
        {
        val=new Date((val.getTime())+(24*60*60*1000)); // +1 day
        }
    while ((val.getDay()<1)||(val.getDay()>5)) // If not Mon thru Fri, keep going...
    return getDate(val,delimiter);
    }

function getPreviousWorkingDate(val,delimiter) /* Get date string YYYYMMDD, with optional delimiter */
    {
    if (val==undefined)
        val=new Date(); // Start at now
    if (typeof(val)=='date')
        val=new Date(val);
    do
        {
        val=new Date((val.getTime())-(24*60*60*1000)); // -1 day
        }
    while ((val.getDay()<1)||(val.getDay()>5)) // If not Mon thru Fri, keep going...
    return getDate(val,delimiter);
    }

function getToday(delimiter) /* Get date string YYYYMMDD, with optional delimiter */
    {
    var val=new Date(); // Start at now
    return getDate(val,delimiter);
    }

function getTomorrow(delimiter) /* Get date string YYYYMMDD, with optional delimiter */
    {
    var val=new Date(); // Start at now
    val.setDate(val.getDate()+1);
    return getDate(val,delimiter);
    }

function getNextWeek(delimiter) /* Get date string YYYYMMDD, with optional delimiter */
    {
    var val=new Date(); // Start at now
    val=new Date((val.getTime())+(7*24*60*60*1000)); // +7 days
    return getDate(val,delimiter);
    }

function getNextMonth(delimiter) /* Get date string YYYYMMDD, with optional delimiter */
    {
    var val=new Date(); // Start at now
    val.setMonth(val.getMonth()+1);
    return getDate(val,delimiter);
    }

function getDateFromSerialDate(val,delimiter)
    {
    if (delimiter==undefined)
        delimiter='';
    // Excel & Lotus 123 have a bug with 29-02-1900. 1900 is not a
    // leap year, but Excel & Lotus 123 think it is...
    if (val == 60)
        {
        return '19000229';
        }
    else 
    if (val < 60)
        {
        // Because of the 29-02-1900 bug, any serial date 
        // under 60 is one off... Compensate.
        val++;
        }
    // Modified Julian to YYYYMMDD calculation with an addition of 2415019
    var l = val + 68569 + 2415019;
    var n = Math.floor(( 4 * l ) / 146097);
    l = l - Math.floor(( 146097 * n + 3 ) / 4);
    var i = Math.floor(( 4000 * ( l + 1 ) ) / 1461001);
    l = l - Math.floor(( 1461 * i ) / 4) + 31;
    var j = Math.floor(( 80 * l ) / 2447);
    var Day = Math.floor(l - Math.floor(( 2447 * j ) / 80));
    l = Math.floor(j / 11);
    var Month = j + 2 - ( 12 * l );
    var Year = 100 * ( n - 49 ) + i + l;
    return Year+delimiter+(Month<10?'0'+Month.toString():Month.toString())+delimiter+(Day<10?'0'+Day.toString():Day.toString());
    }

function getTimeFromSerialDate(val,delimiter)
    {
    if (delimiter==undefined)
        delimiter='';
    var TotalSeconds=Math.round((val-Math.floor(val))*(24*60*60));
    var Hours=Math.floor(TotalSeconds/(60*60));
    var Minutes=Math.floor((TotalSeconds-(Hours*60*60))/60);
    var Seconds=Math.floor(TotalSeconds-(Hours*60*60)-(Minutes*60));
    return Hours.toString()+delimiter+Minutes.toString()+delimiter+Seconds.toString();
    }

function getSerialDateFromDate(val)
    {
    if (val==undefined)
        val=new Date(); // Start at now
    if (typeof(val)=='date')
        val=new Date(val);
    var CummulativeDays=Array(0,31,59,90,120,151,181,212,243,273,304,334,365);
    var DaysForYears=(val.getFullYear()-1900)*365;
    var DaysForMonths=CummulativeDays[val.getMonth()];
    var DaysForDays=val.getDate()-((val.getFullYear()%4)==0?1:0); // If a leap year, take off 1
    var DaysForLeapDays=Math.floor((val.getFullYear()-1900)/4)+1; // Add on 1900 for Excel bug
    var DaysForLeapDayThisYear=(!(val.getFullYear()%4)?(((DaysForMonths+DaysForDays)+((val.getMonth()>1)?1:0))>CummulativeDays[2]?1:0):0);
    var SerialDate=DaysForYears+DaysForMonths+DaysForDays+DaysForLeapDays+DaysForLeapDayThisYear;
    return SerialDate;
    }

function getDateFromString(val) // Must be in 'YYYYMMDD' format
    {
    var Days=parseInt(parseFloat(val.substr(6,2)));
    var Months=parseInt(parseFloat(val.substr(4,2)))-1;
    var Years=parseInt(val.substr(0,4));
    return new Date(Years,Months,Days);
    }

