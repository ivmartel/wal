/**
 * Tests for the 'alarm.js' file.
 */
// Do not warn if these variables were not defined before.
/* global module, test, equal, ok */
module("alarm");

test("Test clock.", function() {
    // basic clock
    var clock = new wal.Clock();
    equal(1, 1, "Stupid test.");
});
