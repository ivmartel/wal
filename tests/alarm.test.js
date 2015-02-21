/**
 * Tests for the 'alarm.js' file.
 */
// Do not warn if these variables were not defined before.
/* global module, test, ok */
module("alarm");

test("Test alarm verify.", function () {
    // bad alarm
    var alarm0 = new wal.Alarm(null, null);
    ok(!alarm0.verify(), "Bad alarm should fail verification.");
});
