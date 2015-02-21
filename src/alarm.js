// namespace
var wal = wal || {};

/**
 * Alarm.
 * Possible actions:
 * - Simplest that works:
 *   window.location = alarmUrl;
 * - Will be blocked as pop-up:
 *   window.open(alarmUrl, '_blank');
 * - Needs same origin:
 *   var iframe = document.getElementById("alarm-iframe");
 *   iframe.src = alarmUrl;
 */
wal.Alarm = function (time, action)
{
    // Check input time.
    this.verify = function () {
        var now = new Date();
        if ( time instanceof Date &&
            time.getTime() !== 0 &&
            time.getTime() > now.getTime() ) {
            return true;
        }
        return false;
    };

    // Check the input date and call action if equal.
    this.check = function (date) {
        // compare input to member (ignore milliseconds)
        if ( time && typeof time.getTime != "undefined" && time.getTime() !== 0 &&
            Math.abs(time.getTime() - date.getTime()) < 1000 ) {
            return action.run();
        }
        return false;
    };

    // Show the alarm
    this.show = function (divId) {
        var div = document.getElementById(divId);
        wal.clearDiv(div);
        div.style.display = 'block';
        var text = "Alarm set for " +
            wal.prettyTime(time.getHours()) + "h" +
            wal.prettyTime(time.getMinutes()) +
            " with action to " + action.getText() + ".";
        div.appendChild( document.createTextNode(text) );
    };
};

// Open URL action.
wal.OpenUrlAction = function (url)
{
    // Get the text description of the action.
    this.getText = function () {
        return "open url: " + url;
    };
    // Run the action.
    this.run = function () {
        window.location = url;
    };
};
