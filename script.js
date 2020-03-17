(function () {
    const form = document.querySelector('form');
    form.querySelectorAll('input').forEach(input => {
        input.onkeyup = handleKeyUp;
        input.onblur = handleBlur;
    });
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        form.querySelectorAll('input').forEach(input => toggleInvalidClass(input, true));
        if (isFormValid(form.elements)) {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    checkIn: form.elements.checkIn.value,
                    checkOut: form.elements.checkOut.value
                }, response => {
                    if (response.success) {
                        window.close();
                    }
                });
            });
        } else {
            form.querySelectorAll('input').forEach(input => toggleInvalidClass(input, input.value));
        }
    });

    function isFormValid(elements) {
        return elements.checkIn.value && elements.checkOut.value;
    }

    function toggleInvalidClass(element, valid) {
        return valid ? element.classList.remove('invalid') : element.classList.add('invalid');
    }

    function handleKeyUp(e) {
        toggleInvalidClass(e.target, true);
    }

    function handleBlur(e) {
        if (!e.target.value) {
            toggleInvalidClass(e.target, false);
        }
    }
}());
