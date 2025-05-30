function addTime(beforestr, afterstr) {
    // before = "00:00"
    // after = "01:00"
    var before = beforestr.split(":");
    var after = afterstr.split(":");
    var minutes = Number(before[1]) + Number(after[1]);
    var hours = Number(before[0]) + Number(after[0]) + Math.floor(minutes / 60);
    var newMinutes = minutes % 60;
    var newHours = hours % 24;
    return "".concat(String(newHours).padStart(2, '0'), ":").concat(String(newMinutes).padStart(2, '0'));
}
function testAddTime() {
    var testCases = [
        { before: "00:00", after: "01:00", expected: "01:00" },
        { before: "01:00", after: "01:00", expected: "02:00" },
        { before: "23:00", after: "01:00", expected: "00:00" },
        { before: "12:30", after: "01:30", expected: "14:00" },
        { before: "12:30", after: "12:30", expected: "01:00" },
        { before: "12:30", after: "23:30", expected: "12:00" },
        { before: "12:30", after: "11:30", expected: "00:00" },
        { before: "12:30", after: "00:30", expected: "13:00" },
        { before: "12:30", after: "00:00", expected: "12:30" },
        { before: "12:30", after: "23:59", expected: "12:29" },
        { before: "12:30", after: "23:01", expected: "11:31" },
        { before: "12:30", after: "22:01", expected: "10:31" },
        { before: "12:30", after: "21:01", expected: "09:31" },
        { before: "12:30", after: "20:01", expected: "08:31" },
        { before: "12:30", after: "19:01", expected: "07:31" },
        { before: "12:30", after: "18:01", expected: "06:31" },
        { before: "12:30", after: "17:01", expected: "05:31" },
    ];
    testCases.forEach(function (_a) {
        var before = _a.before, after = _a.after, expected = _a.expected;
        var result = addTime(before, after);
        if (result !== expected) {
            console.error("Test failed for ".concat(before, " + ").concat(after, ": expected ").concat(expected, ", got ").concat(result));
        }
        else {
            console.log("Test passed for ".concat(before, " + ").concat(after, ": got ").concat(result));
        }
    });
}
testAddTime();
