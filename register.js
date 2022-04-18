
const form = document.getElementById('form');
form.onsubmit = (e)=>{
    e.preventDefault();
    if(validation()) {
        window.location.href = form.getAttribute("action")
    };
};

function validation() {
    var isvalid = true;
    const userName = document.getElementById('user-name');
    const password = document.getElementById('pwd');
    const repeatPwd = document.getElementById('repeat-pwd');
    const nickname = document.getElementById('nickname');

    const userNameValue = userName.value.trim();
    console.log(userNameValue);
    const passwordValue = password.value.trim();
    const repeatPwdValue = repeatPwd.value.trim();
    const nicknameValue = nickname.value.trim();
    if(userNameValue == "" || userNameValue == undefined) {
        isvalid = false;
        setError(userName, 'Pleas enter username');

    }else if(typeof userNameValue != "string") {
        isvalid = false;
        setError(userName, 'We only process strings');
    } else if (userNameValue.length < 4) {
        isvalid = false;
        setError(userName,'Username cannot be shorter then 4 character');
    } else {
        setSuccess(userName);
    }
    if(nicknameValue == "" || nicknameValue == undefined) {
        isvalid = false;
        setError(nickname, 'Pleas enter nickname');

    }else if(typeof nicknameValue != "string") {
        isvalid = false;
        setError(nickname, 'We only process strings');
    } else if (nicknameValue.length < 4) {
        isvalid = false;
        setError(nickname,'Nickname cannot be shorter then 4 character');
    } else {
        setSuccess(nickname);
    }

    if(passwordValue == "" || passwordValue == undefined) {
        isvalid = false;
        setError(password,'Pleas enter password');
    }else if(passwordValue != repeatPwdValue) {
        isvalid = false;
        setError(repeatPwd,'Your passwords dont match');
    } else if(repeatPwdValue.length < 8) {
        isvalid = false;
        setError(repeatPwd,'Password cannot be shorter then 8 character');
    } else if(!(/[a-zA-Z]/.test(repeatPwdValue))) {
        isvalid = false;
        setError(repeatPwd,'Password must contain at least one letter');
    } else if(!(/[0-9]/.test(repeatPwdValue))) {
        isvalid = false;
        setError(repeatPwd,'Password must contain at least one number');
    } else {
        setSuccess(repeatPwd);
    }

    if(repeatPwdValue == "" || repeatPwdValue == undefined) {
        isvalid = false;
        setError(repeatPwd,'Pleas enter password again');
    } else if (typeof passwordValue != "string") {
        isvalid = false;
        setError(password, 'we only process strings');
    } else if (typeof repeatPwdValue != "string") {
        isvalid = false;
        setError(repeatPwd, 'we only process strings');
    } else if(passwordValue.length < 8) {
        isvalid = false;
        setError(password,'Password cannot be shorter then 8 character');
    } else if(!(/[a-zA-Z]/.test(passwordValue))) {
        isvalid = false;
        setError(password,'Password must contain at least one letter');
    } else if(!(/[0-9]/.test(passwordValue))) {
        isvalid = false;
        setError(password,'Password must contain at least one number');
    } else{
        setSuccess(password);
    }
    return isvalid;
}
    
    
function setError(input, message) {
    const sectioninput = input.parentElement.parentElement;
    const small = sectioninput.querySelector('small');
    small.innerText = message;
    sectioninput.className = 'form-control section-input error';
}
function setSuccess(input) {
    const sectioninput = input.parentElement.parentElement;
    sectioninput.className = 'form-control section-input success';
}