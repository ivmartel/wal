/**
 * Tests for the 'alarm.js' file.
 */
// Do not warn if these variables were not defined before.
/* global module, test, equal */
module("alarm");

test("Test clock.", function() {
    // basic clock
    var clock = new wal.Clock();
    clock.start();
    equal(1, 1, "Stupid test.");
});
