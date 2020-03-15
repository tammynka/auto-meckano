(function () {
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                checkIn: form.elements.checkIn.value,
                checkOut: form.elements.checkOut.value
            }, response => {
                console.log(response);
                if (response.success) {
                    window.close();
                }
            });
        });
    });
}());
