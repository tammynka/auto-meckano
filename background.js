chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        const weekDays = getWeekDays();
        if (weekDays) {
            weekDays.forEach(day => {
                logEntry(day, '.checkin', request.checkIn);
                logEntry(day, '.checkout', request.checkOut);
            });
        }
        sendResponse({ success: true });
    });

function getReportTable() {
    return document.querySelector('#mainview .employee-report');
}

function getReportTableDays() {
    const table = getReportTable();
    return table && [...table.querySelectorAll('.alt0'), ...table.querySelectorAll('.alt1')];
}

function getWeekDays() {
    const days = getReportTableDays();
    return days && [...days].filter(tr => !tr.classList.contains('highlightingRestDays'));
}

function logEntry(day, className, value) {
    const span = day.querySelector(className);
    const input = span.nextSibling.nextSibling;
    span.click();
    input.value = value;
    input.blur();
}
