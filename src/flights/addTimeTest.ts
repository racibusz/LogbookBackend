function addTime(beforestr: string, afterstr: string){
    const before = beforestr.split(":");
    const after = afterstr.split(":");
    const minutes = Number(before[1]) + Number(after[1]);
    const hours = Number(before[0]) + Number(after[0]) + Math.floor(minutes / 60);
    const newMinutes = minutes % 60;
    const newHours = hours % 24;
    return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
}


function testAddTime() {
    const testCases = [
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
        { before: "12:30", after:"17:01", expected:"05:31"},
    ]
    testCases.forEach(({ before, after, expected }) => {
        const result = addTime(before, after);
        if (result !== expected) {
            console.error(`Test failed for ${before} + ${after}: expected ${expected}, got ${result}`);
        } else {
            console.log(`Test passed for ${before} + ${after}: got ${result}`);
        }
    });
}
testAddTime();