// namespace
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

// show suggestions stored in a json file.
wal.showSuggestions = function (filename, divId) {
    // suggestions
    $.getJSON(filename, function (json) {
        // check keys
        var keys = Object.keys(json);
        if ( keys.length === 0 ) {
            return;
        }
        // html select
        var select = document.createElement("select");
        select.id = "alarm-suggest";
        // first select option
        var option = document.createElement("option");
        option.value = "choose-one";
        option.appendChild( document.createTextNode("Choose one...") );
        select.appendChild(option);
        // select options
        for ( var i = 0; i < keys.length; ++i ) {
            option = document.createElement("option");
            option.value = json[keys[i]].url;
            option.appendChild( document.createTextNode(json[keys[i]].title) );
            select.appendChild(option);
        }
        // contain div
        var div = document.getElementById(divId);
        // select label
        var label = document.createElement("label");
        label.for = "alarm-suggest";
        label.appendChild( document.createTextNode("Suggestions:") );
        div.appendChild(label);
        // append select
        div.appendChild(select);
        // trigger creation
        $("#"+divId).trigger("create");
    });
};
