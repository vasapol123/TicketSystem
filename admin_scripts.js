var extend_btn = document.querySelector('.extended_info');
let extend_btnOpen = false;

extend_btn.addEventListener('click', () => {
    if(!extend_btnOpen) {
        extend_btn.children[0].style.transform = "rotate(180deg)"
        extend_btn.children[0].style.transition = "all .3s ease"

        document.getElementsByClassName('page1')[0].style.display = "flex";
        extend_btnOpen = true;
    }
    else {
        extend_btn.children[0].style.transform = "rotate(0deg)"

        document.getElementsByClassName('page1')[0].style.display = "none";
        extend_btnOpen = false;
    }
});
