var list_of_users = {
    "Ross": "Ross Geller",
    "Monica": "Monica Geller",
    "Chandler": "Chandler Bing",
    "Rachel": "Rachel Green",
    "Joey": "Joey Tribbiany",
    "Phobe": "Phobe Buffay"
};
const form = document.getElementById('form');
form.onsubmit = (e) => {
    e.preventDefault();
    if (enterUser()) {
        window.location.href = form.getAttribute("action")
    };
};
function enterUser() {
    var isvalid = true;
    const userName = document.getElementById("user-name");
    const password = document.getElementById("pwd");
    const userNameValue = userName.value.trim();
    const passwordValue = password.value.trim();
    if (typeof userNameValue !== "string") {
        alert("Invalid Username input. We only process strings.");
        setError(userName, 'Username needs to be a string');
        isvalid = false;
    }
    else if (userNameValue == "" || userName == undefined) {
        alert("Invalid input. Please enter username");
        isvalid = false;
        setError(userName, 'Please enter username');
    }
    else if (userNameValue.length < 4) {
        alert("Invalid input. The username needs to contain at least four characters.");
        setError(userName, 'Username needs to contain at least four characters.');
        isvalid = false;
    }
    else if (list_of_users[userNameValue] == null) {
        alert("Invalid input. Username does not exists");
        setError(userName, 'Username does not exists');
        isvalid = false;
    }
    else {
        setSuccess(userName);
    }
    if (typeof passwordValue !== "string") {
        alert("Invalid password input. we only process strings.");
        setError(password, 'Password needs to be a string.');
        isvalid = false;
    }
    else if (passwordValue == "" || passwordValue == undefined) {
        alert("Invalid input. Please enter password");
        setError(password, 'Please enter password');
        isvalid = false;
    }
    else if (passwordValue.length < 8) {
        alert("Invalid input. The password needs to contain at least eight character.");
        setError(password, 'Password needs to contain at least eight characters.');
        isvalid = false;
    }
    else if (list_of_users[userNameValue] != passwordValue) {
        alert("Invalid input. Password does not match username");
        setError(password, 'Password does not match username');
        isvalid = false;
    }
    else {
        //window.location.href = "chat.html";
        //isvalid = true;
        alert("Hello " + userName + (" , welcome to Superchat"));
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