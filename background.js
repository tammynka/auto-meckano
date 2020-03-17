chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        const freeReportButton = document.querySelector('#mainview .free-reporting');
        if (freeReportButton) {
            freeReportButton.click();
            const timeout = setTimeout(() => {
                autoFillTable(request.checkIn, request.checkOut);
            }, 2000);
        }
        sendResponse({ success: true });
    });

function autoFillTable(checkIn, checkOut) {
    const workDays = getWorkDays();
    if (workDays && workDays.length) {
        workDays.forEach(day => {
            const checkInInput = day.querySelector(`input.checkIn`);
            if (checkIn && !checkInInput.value) {
                checkInInput.value = checkIn;
            }
            const checkOutInput = day.querySelector(`input.checkOut`);
            if (checkOut && !checkOutInput.value) {
                checkOutInput.value = checkOut;
            }
        });
    }
}

function getWorkDays() {
    const alt0s = document.querySelectorAll('.hours-report .alt0');
    const alt1s = document.querySelectorAll('.hours-report .alt1');
    const days = [...alt0s, ...alt1s];
    return days && [...days].filter(day => {
        const date = day.querySelector('.date').innerText;
        return !isRestDay(date);
    });
}

function isRestDay(dateStr) {
    return (
        dateStr.search(/(^|\s)\u05D7\u05D2(?=\s|$)/) > -1 ||
        dateStr.search(/[\u05D5]/) > -1 ||
        dateStr.search(/[\u05E9]/) > -1
    )
}
