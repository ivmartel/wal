/**
 * Tests for the 'tools.js' file.
 */
// Do not warn if these variables were not defined before.
/* global module, test, deepEqual */
module("alarm");

test("Test getQueryParams.", function () {
    // query string
    var qs = "?a=0&b=1";
    var params = wal.getQueryParams(qs);
    var theo = { "a": "0", "b": "1" };
    deepEqual(params, theo, "getQueryParams test.");
});
