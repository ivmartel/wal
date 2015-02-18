// Web ALarm
var wal = wal || {};

// append a zero to one digit time.
wal.prettyTime = function (t) {
    return ( t < 10 ) ? "0" + t : t;
};
// clear a div from its content
wal.clearDiv = function (div) {
    while ( div.firstChild ) {
        div.removeChild( div.firstChild );
    }
};
// get a Date object from a time given as: "HH:MM"
wal.time2Date = function (time) {
    var date = null;
    var indexSemiCol = time.indexOf(':');
    if ( indexSemiCol != -1 ) {
        date = new Date();
        date.setHours( time.substr(0,indexSemiCol) );
        date.setMinutes( time.substr(indexSemiCol+1) );
        date.setSeconds( 0 );
    }
    return date;
};
// get query parameters
wal.getQueryParams = function (qs) {
    qs = qs.split("+").join(" ");

    var params = {};
    var re = /[?&]?([^=]+)=([^&]*)/g;

    var tokens = re.exec(qs);
    while ( tokens ) {
        params[ decodeURIComponent(tokens[1]) ] =
            decodeURIComponent(tokens[2]);
        tokens = re.exec(qs);
    }

    return params;
};

// Clock
wal.Clock = function (divId)
{
    // closure to self
    var _self = this;
    // timer method
    var _timer = null;
    // optional listener
    var _listeners = [];

    // Add a clock listener: will be called at each second after the clock starts
    // with the current date as argument. If the listener returns true, it
    // stops the clock.
    this.addListener = function ( listener ) {
        _listeners.push( listener );
    };

    // Start the clock
    this.start = function () {
        // setup timer
        _timer = setInterval( function () {
            _self.show();
            }, 1000 );
        // first show
        this.show();
    };

    // Stop the clock
    this.stop = function () {
        clearInterval( _timer );
    };

    // Show the clock
    this.show = function () {
        var date = new Date();

        // call listeners
        if ( _listeners ) {
            for ( var i = 0; i < _listeners.length; ++i ) {
                if ( _listeners[i](date) ) {
                    this.stop();
                }
            }
        }

        // update display
        // hours
        var divHours = document.getElementById(divId+"-hours");
        wal.clearDiv( divHours);
        divHours.appendChild( document.createTextNode(
            wal.prettyTime(date.getHours()) ) );
        // minutes
        var divMinutes = document.getElementById(divId+"-minutes");
        wal.clearDiv( divMinutes);
        divMinutes.appendChild( document.createTextNode(
            wal.prettyTime(date.getMinutes()) ) );
        // seconds
        var divSeconds = document.getElementById(divId+"-seconds");
        wal.clearDiv( divSeconds);
        divSeconds.appendChild( document.createTextNode(
            wal.prettyTime(date.getSeconds()) ) );
    };
};

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
