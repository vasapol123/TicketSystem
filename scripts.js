const navBurger = document.querySelector('.nav-hamburger');
const navSec = document.querySelector('.sec-navbar');
let menuOpen = false;

navBurger.addEventListener('click', () => {
    if(!menuOpen) {
        navBurger.classList.add('open');
        navSec.classList.add('open');
        menuOpen = true;
    }
    else {
        navBurger.classList.remove('open');
        navSec.classList.remove('open');
        menuOpen = false;
    }
});

const translate = document.querySelectorAll('.translate');
const row_header = document.querySelector('.row-header');
const header = document.querySelector('header');
const section = document.querySelector('section');
const opacity = document.querySelectorAll('.opacity');
const scroll_down= document.querySelector('.scroll-down-wrapper');

let header_height = header.offsetHeight;
let section_height = section.offsetHeight;

window.addEventListener('scroll', () => {
    let scroll = window.pageYOffset;
    let sectionY = section.getBoundingClientRect();

    translate.forEach(element => {
        let speed = element.dataset.speed;
        element.style.transform = `translateY(${scroll * speed}px)`;
        if (scroll >= 700) {
            element.style.transform = `translateY(0px)`;
            element.style.display = "none";
        }
        else {
            element.style.removeProperty('display');
        }
    })

    opacity.forEach(element => {
        element.style.opacity = scroll / (sectionY.top + section_height);
    })

    row_header.style.opacity = - scroll / (header_height / 2) + 1;
    scroll_down.style.opacity = - scroll / (header_height / 2) + 1;
    if (scroll >= 700) {
        row_header.style.opacity = 0;
        scroll_down.style.opacity = 0;
        scroll_down.style.display = "none";
    }
    else {
        scroll_down.style.display = "flex";
    }
});

let input = document.querySelectorAll('input');
var clear = document.querySelectorAll('.input__field');
var focused = document.activeElement;

input.forEach(element => {
    element.addEventListener('input', () => {
        let bool = element.value.length
        focused = document.querySelector(":focus");

        clear.forEach(element => {
            try {
                if (element.querySelector('.'.concat(focused.id))) {
                    element.querySelector('.clear').style.display = 'block'
                    element.querySelector('.clear').style.opacity = bool ? 1:0;
                }
            } catch {}
        })
    })
})

const file = document.querySelector('#file-upload');
const file_name = document.getElementById('file-name');

file.addEventListener('change', (e) => {
    const [file] = e.target.files;
    var files; var fileSize; var p;
    var { name: fileName, size } = file || {};

    if (`${fileName}` != 'undefined' && `${fileName}` != NaN) {
        document.getElementsByClassName('file-upload')[0].style.removeProperty('box-shadow');
        document.querySelector('#invalid_ext').style.display = "none";
        document.querySelector('#invalid_ext').innerHTML = '';

        if (document.getElementById('file-name').childElementCount > 0) {
            var children = [].slice.call(document.getElementById('file-name').children);
            children.forEach(element => {
                element.remove();
            });
        }
        for (var i=0; i<e.target.files.length; i++) {
            files  = e.target.files[i];
            ({fileName, size} = {fileName: files.name, size: files.size});
            console.log(fileName);
            fileSize = (size / 1000);
            let new_fileSize;
            (fileSize < 1024) ? new_fileSize = fileSize + " KB" : new_fileSize = (size / (1024 * 1024)).toFixed(2) + " MB";

            var fileIconSvg = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="paperclip" class="svg-inline--fa fa-paperclip fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M43.246 466.142c-58.43-60.289-57.341-157.511 1.386-217.581L254.392 34c44.316-45.332 116.351-45.336 160.671 0 43.89 44.894 43.943 117.329 0 162.276L232.214 383.128c-29.855 30.537-78.633 30.111-107.982-.998-28.275-29.97-27.368-77.473 1.452-106.953l143.743-146.835c6.182-6.314 16.312-6.422 22.626-.241l22.861 22.379c6.315 6.182 6.422 16.312.241 22.626L171.427 319.927c-4.932 5.045-5.236 13.428-.648 18.292 4.372 4.634 11.245 4.711 15.688.165l182.849-186.851c19.613-20.062 19.613-52.725-.011-72.798-19.189-19.627-49.957-19.637-69.154 0L90.39 293.295c-34.763 35.56-35.299 93.12-1.191 128.313 34.01 35.093 88.985 35.137 123.058.286l172.06-175.999c6.177-6.319 16.307-6.433 22.626-.256l22.877 22.364c6.319 6.177 6.434 16.307.256 22.626l-172.06 175.998c-59.576 60.938-155.943 60.216-214.77-.485z"></path></svg>`
            // var fileNameAndSize = `${fileName} \n${fileSize}KB`;
            p = document.createElement('p');
            p.className = "file"
            
            file_name.appendChild(p);
            file_name.children[i].appendChild(document.createElement('span')).textContent = `${fileName}`;
            file_name.children[i].appendChild(document.createElement('span')).textContent = `${new_fileSize}`;
        }
    }
    const parent = document.querySelectorAll('.file');
    parent.forEach(element => {
        if (element.childElementCount == 2) {
            element.innerHTML = fileIconSvg + element.innerHTML;
        }
        })
});

const anonymous = document.querySelector('.checkbox');
const {inputFirstname, inputLastname, inputIDNum, inputPhoneNum, inputAddress} = {inputFirstname: document.getElementById('fn'),
                                                                                    inputLastname: document.getElementById('ln'),
                                                                                    inputIDNum: document.getElementById('idn'),
                                                                                    inputPhoneNum: document.getElementById('pn'),
                                                                                    inputAddress: document.getElementById('ua')};

anonymous.addEventListener('change', () => {
    let bool = inputFirstname.disabled;
    inputFirstname.disabled = bool ? false:true;
    inputLastname.disabled = bool ? false:true;
    inputIDNum.disabled = bool ? false:true;
    inputPhoneNum.disabled = bool ? false:true;
    inputAddress.disabled = bool ? false:true;
    clearInput('ln');
    clearInput('fn');
    clearInput('idn');
    clearInput('pn');
    clearInput('ua');

    if (bool === false) {
        document.getElementsByClassName('first_name')[0].setAttribute('style', 'background: #e9ecef;');
        document.getElementsByClassName('last_name')[0].setAttribute('style', 'background: #e9ecef;');
        document.getElementsByClassName('id_number')[0].setAttribute('style', 'background: #e9ecef;');
        document.getElementsByClassName('phone_number')[0].setAttribute('style', 'background: #e9ecef;');
        document.getElementsByClassName('user_address')[0].setAttribute('style', 'background: #e9ecef;');
    } 
    else {
        document.getElementsByClassName('first_name')[0].setAttribute('style', 'background: #fff;');
        document.getElementsByClassName('last_name')[0].setAttribute('style', 'background: #fff;');
        document.getElementsByClassName('id_number')[0].setAttribute('style', 'background: #fff;');
        document.getElementsByClassName('phone_number')[0].setAttribute('style', 'background: #fff;');
        document.getElementsByClassName('user_address')[0].setAttribute('style', 'background: #fff;');
    }
})
const inputField = ['first_name', 'last_name', 'id_number', 'phone_number', 'user_address', 'date', 'file-upload', 'description'];

submitForm = function() {
    var count = 0;
    var invalid_input_value;
    var error_color = `#ffa8a8`
    const file_extension = ["jpg", "jpeg", "png", "gif"];

    for (var i=0; i < inputField.length; i++) {
        let element = document.getElementById(inputField[i]);

        if (inputField[i] === 'id_number' && (`${element[0].value}`.match(new RegExp(/[0-9]/, "g")) || []).length != 13 && element[0].value != 0) {
            let error_msg = "Identification card number must have 13 digits.";

            document.getElementsByClassName(inputField[i])[0].style = `box-shadow: inset 0 0 0 0.125rem ${error_color};`;
            document.querySelector('#invalid_id').innerHTML = `<div>
                                                                       <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="exclamation-circle" class="svg-inline--fa fa-exclamation-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path></svg>
                                                                  </div>
                                                                  <p>${error_msg}</p>`;
            document.querySelector('#invalid_id').style.display = "flex";
            document.querySelector('#invalid_phone').style.display = "flex";
            count--;
        }
        else if (inputField[i] === 'phone_number' && (`${element[0].value}`.match(new RegExp(/[0-9]/, "g")) || []).length != 10 && element[0].value != 0) {
            let error_msg = "Phone number format is invalid or must have 10 digits.";

            document.getElementsByClassName(inputField[i])[0].style = `box-shadow: inset 0 0 0 0.125rem ${error_color};`;
            document.querySelector('#invalid_phone').innerHTML = `<div>
                                                                       <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="exclamation-circle" class="svg-inline--fa fa-exclamation-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path></svg>
                                                                  </div>
                                                                  <p>${error_msg}</p>`;
            document.querySelector('#invalid_id').style.display = "flex";
            document.querySelector('#invalid_phone').style.display = "flex";
            count--;
        }
        // ================== check file extension ================== //
        else if (inputField[i] === 'file-upload'){
            document.querySelectorAll("input").forEach(element => {
                if (element.name === "upload[]") {
                    for (var i=0; i <= element.files.length-1; i++) {
                        let file_name = element.files.item(i).name;

                        if (file_extension.includes(file_name.slice((file_name.lastIndexOf(".")-1 >>> 0)+2 ).toLowerCase()) != true ) {
                            let error_msg = `The specified file ${file_name} has invalid extension. Only files with the following extensions are allow: jpg jpeg png gif`;
                            document.querySelector('#invalid_ext').innerHTML += `<div>
                                                                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="exclamation-circle" class="svg-inline--fa fa-exclamation-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path></svg>
                                                                                </div>
                                                                                <p>${error_msg}</p>`;
                            document.getElementsByClassName('file-upload')[0].style = `box-shadow: inset 0 0 0 0.125rem ${error_color};`;
                            document.querySelector('#invalid_ext').style.display = "flex";
                            count--;
                        } 
                    }
                }
            });
        }
        
        if (element.checkValidity()) {
            count++;
            if (count === inputField.length) {
                let json = [];
                document.querySelectorAll("form").forEach(f => {
                    let obj = {};
                    f.querySelectorAll("input").forEach(element => {
                        if (element.name === "upload[]") {
                            for (var i=0; i <= element.files.length-1; i++) {
                                obj['src' + `[${i}]`] = element.files.item(i).name;
                                
                            }
                        }
                        else {
                            obj[element.name] = element.value || ""
                        }
                    });

                    f.querySelectorAll("textarea").forEach(element => obj[element.name] = element.value || "");
                    json.push(obj)     
                });

                let json_format = `{
                    "first_name": "${json[0].first_name}",
                    "last_name": "${json[1].last_name}",
                    "id_number": "${json[2].id_number}",
                    "phone_number":"${json[3].phone_number}",
                    "address":"${json[4].user_address}",
                    "date":"${json[5].date}",
                    "src":[${JSON.stringify(json[6])}],
                    "description":"${json[7].description}"}`
                sendMessage(json_format);
            }
        }
        else {
            let error_message = 'Error: Send confirmation could not be complete. Please check your information and try again.';
            if (inputField[i] === 'user_address' || inputField[i] === 'description') {
                document.getElementsByClassName(inputField[i])[0].style = `box-shadow: inset 0 0 0 0.125rem ${error_color};`;
                document.getElementsByName(inputField[i])[0].style = `border: 0.125rem solid ${error_color};`;
            }
            else {
                document.getElementsByClassName(inputField[i])[0].style = `box-shadow: inset 0 0 0 0.125rem ${error_color};`;
            }
            if (inputField[i] != 'file-upload')
                document.getElementById(inputField[i]).reportValidity();

            let invalid_form = `<div>
                                    <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="times-circle" class="svg-inline--fa fa-times-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z"></path></svg>
                                </div>
                                <p>${error_message}</p>`
            document.querySelector('.invalid-form').innerHTML = invalid_form;
        }
    }
    return false;
    // document.getElementsByClassName('fn')[0].style = 'box-shadow: inset 0 0 0 0.125rem red;'
}

function alphaOnly(event) {
    var value = String.fromCharCode(event.which);
    var pattern = new RegExp(/[a-zA-Z]/i);
    return pattern.test(value);
}

function numberOnly(event) {
    var value = String.fromCharCode(event.which);
    var pattern = new RegExp(/[0-9]/i);
    return pattern.test(value);
}

$('#fn').bind('keypress', alphaOnly);
$('#ln').bind('keypress', alphaOnly);
$('#idn').bind('keypress', numberOnly);
$('#pn').bind('keypress', numberOnly);

// submitTest = function() {
//     let first_name  = document.forms['connect_form']['first_name'].value;
//     let last_name = document.forms['connect_form']['last_name'].value;
//     let id_number = document.forms['connect_form']['id_number'].value;
//     let phone_number = document.forms['connect_form']['phone_number'].value;
//     let address = document.forms['connect_form']['user_address'].value;
//     let date = document.forms['connect_form']['date'].value;
//     let description = document.forms['connect_form']['description'].value;

//     let json_format = `{
//         "first_name": "${first_name}",
//         "last_name": "${last_name}",
//         "id_number": "${id_number}",
//         "phone_number":"${phone_number}",
//         "address":"${address}",
//         "date":"${date}",
//         "description":"${description}"
//     }`
//     sendMessage(json_format);
//     return false;
// }


var inputForm = document.querySelectorAll('input, textarea');

inputForm.forEach(element => {
    element.addEventListener('input', () => {
        for (var i=0; i < inputField.length; i++) {
            document.getElementsByClassName(inputField[i])[0].style.removeProperty('box-shadow');
            if (inputField[i] === 'user_address' || inputField[i] === 'description') {
                document.getElementsByName(inputField[i])[0].style.removeProperty('border');
            }
            document.querySelector('.invalid-form').innerHTML = '';

            document.querySelectorAll('.invalid-input').forEach(element => {
                element.innerHTML = '';
                element.style.display ="none";
            })
        }
    })
})

var next = document.querySelector('.next');
var prev = document.querySelector('.prev')
var dots = document.querySelector('dot-wrapper');
var current_dot_index = 0;

next.addEventListener('click', () => {
    if (current_dot_index === 4) {
        current_dot_index = 0;
    }
    else {
        current_dot_index++;
    }
    document.querySelector('.active').classList.remove('active');
    document.querySelector('.show').classList.remove('show');

    document.querySelectorAll('.dot')[current_dot_index].classList.add('active');
    document.querySelectorAll('.card-item')[current_dot_index].classList.add('show');
    console.log(current_dot_index);
})

prev.addEventListener('click', () => {
    if (current_dot_index === 0) {
        current_dot_index = 4;
    }
    else {
        current_dot_index--;
    }
    document.querySelector('.active').classList.remove('active');
    document.querySelector('.show').classList.remove('show');

    document.querySelectorAll('.dot')[current_dot_index].classList.add('active');
    document.querySelectorAll('.card-item')[current_dot_index].classList.add('show');
    console.log(current_dot_index);
})
