/*var list_of_users = {
    "Ross": "Ross Geller",
    "Monica": "Monica Geller",
    "Chandler": "Chandler Bing",
    "Rachel": "Rachel Green",
    "Joey": "Joey Tribbiany",
    "Phobe": "Phobe Buffay"
};*/
var list_of_users = [
    {
      username: "Ross",
      nickname: "Ross Geller",
      Password: "Ross1234",
      imageurl: "Ross.jpg",

    },
    {
      username: "Monica", 
      nickname: "Monica Geller",
      Password: "Monica123",
      imageurl: "Monica.jpg",
    },
    {
      username: "Chandler", 
      nickname: "Chandler Bing",
      Password: "Chandler123",
      imageurl: "Chandler.jpg",
    },
    {
      username: "Rachel", 
      nickname: "Rachel Green",
      Password: "Rachel123",
      imageurl: "Rachel.jpg",
    },
    {
      username: "Joe", 
      nickname: "Joey Tribbiany",
      Password: "Joey1234",
      imageurl: "Joe.jpg",
    },
    {
      username: "Phobe", 
      nickname: "Phobe Buffay",
      Password: "Phobe123",
      imageurl: "Phobe.jpg",
    },
]

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
    if(userNameValue == "" || userNameValue == undefined) {
        isvalid = false;
        setError(userName, 'Please enter username');

    } else if (typeof userNameValue != "string") {
        setError(userName, 'We only process strings.');
        isvalid = false;
    } else if (userNameValue.length < 4) {
        setError(userName, 'Username needs to contain at least four characters.');
        isvalid = false;
    } else if (list_of_users.find((element) => { element.username = userNameValue;}) == undefined) {
        setError(userName, 'Username does not exists');
        isvalid = false;
    } else {
        setSuccess(userName);
    }
    if (typeof passwordValue !== "string") {
        setError(password, 'We only process strings.');
        isvalid = false;
    } else if (passwordValue == "" || passwordValue == undefined) {
        setError(password, 'Please enter password');
        isvalid = false;
    }
    else if (passwordValue.length < 8) {
        setError(password, 'Password needs to contain at least eight characters.');
        isvalid = false;
    }
    else if (list_of_users.find((element) => { element.username = userNameValue;}).Password != passwordValue) {
        setError(password, 'Password does not match username');
        isvalid = false;
    }
    else {
        //window.location.href = "chat.html";
        //isvalid = true;
       // alert("Hello " + userName + (" , welcome to Superchat"));
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