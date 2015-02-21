// namespace
var wal = wal || {};

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
