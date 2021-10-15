// toggle complainant personal information.

var extend_btn = document.querySelectorAll('.extend_info');
let extend_btnOpen = false;

extend_btn.forEach(element => {
    
    element.addEventListener('click', () => {
        let extend_btn_index = document.getElementsByClassName(`${extend_btn.className}`)[0];
        if(!extend_btnOpen) {
            element.children[0].style.transform = "rotate(180deg)"
            element.children[0].style.transition = "all .3s ease"

            document.getElementsByClassName('info-1')[0].style.display = "flex";
            extend_btnOpen = true;
        }
        else {
            element.children[0].style.transform = "rotate(0deg)"

            document.getElementsByClassName('info-1')[0].style.display = "none";
            extend_btnOpen = false;
        }
    });
});

// paginator

var page_btn = document.querySelectorAll('button');
var current_page = document.querySelector('#input_number');

for (var i=0; i < page_btn.length; i++) {
    page_btn[i].addEventListener('click', function(e) {
        e.preventDefault();

        if (current_page.value == 1) {
            document.getElementsByClassName('previous')[0].setAttribute('disabled', 'disabled');
            document.getElementsByClassName('to_firstpage')[0].setAttribute('disabled', 'disabled');
        }
        else {
            document.getElementsByClassName('previous')[0].removeAttribute('disabled');
            document.getElementsByClassName('to_firstpage')[0].removeAttribute('disabled');
        }
        let allPages = document.querySelectorAll('.page');
        allPages.forEach(element => {
            let pattern = `/(page-${current_page.value})/`;
            let class_name = new RegExp(pattern, "g");
            if (class_name.test(element.className) != true) {
                element.style.display = "none";
            }
        });
        document.getElementsByClassName(`page-${current_page.value}`)[0].style.display = "block";
    });
}

current_page.addEventListener('change', function(e) {
    let allPages = document.querySelectorAll('.page');
    allPages.forEach(element => {
        let pattern = `/(page-${e.target.value})/`;
        let class_name = new RegExp(pattern, "g");
        if (class_name.test(element.className) != true) {
            element.style.display = "none";
        }
    });
    document.getElementsByClassName(`page-${e.target.value}`)[0].style.display = "block";
})

// copy input text to clipboard

var clipboard = document.querySelectorAll('.clipboard');
clipboard.forEach(element => {
    element.addEventListener('mouseout', () => {
        element.innerHTML = `<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="clipboard" class="svg-inline--fa fa-clipboard fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 40c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm144 418c0 3.3-2.7 6-6 6H54c-3.3 0-6-2.7-6-6V118c0-3.3 2.7-6 6-6h42v36c0 6.6 5.4 12 12 12h168c6.6 0 12-5.4 12-12v-36h42c3.3 0 6 2.7 6 6z"></path></svg>`
    });
    element.addEventListener('click', () => {
        let copyText = element.parentNode.querySelector('input');

        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile device

        navigator.clipboard.writeText(copyText.value);

        element.innerHTML = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="clipboard" class="svg-inline--fa fa-clipboard fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M384 112v352c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h80c0-35.29 28.71-64 64-64s64 28.71 64 64h80c26.51 0 48 21.49 48 48zM192 40c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24m96 114v-20a6 6 0 0 0-6-6H102a6 6 0 0 0-6 6v20a6 6 0 0 0 6 6h180a6 6 0 0 0 6-6z"></path></svg>`
    });
});
