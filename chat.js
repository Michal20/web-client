var chat_user = 'Ross_Geller';
function getTime() {
    var dt = new Date();
    var month = dt.getUTCMonth() + 1; //months from 1-12
    if (month < 10) {
        month = "0" + month;
    }
    var day = dt.getUTCDate();
    if (day < 10) {
        day = "0" + day;
    }
    var year = dt.getUTCFullYear();
    var hours = dt.getHours();
    if (hours < 10) {
        hours = "0" + hours;
    }
    var minutes = dt.getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    return hours + ":" + minutes + " " + day + "/" + month + "/" + year;
};
var message = document.getElementById('messageInput');
function sendText() {
    if (message.value.trim().length == 0) {
        return false;
    } else {
        const node = document.createElement("div");
        node.className = "outgoing_msg";
        const time = getTime();
        node.innerHTML = '<div class="sent_msg"><p>' + message.value + '</p><span class="time_date">' + time + '</span></div>';
        document.getElementById(chat_user).appendChild(node);
        console.log(chat_user);
        const activeChat = document.getElementById("active_chat");
        const chatMsg = activeChat.getElementsByClassName("user_chat_message");
        chatMsg[0].innerHTML = message.value;
        const chatDate = activeChat.getElementsByClassName("user_chat_date");
        chatDate[0].innerHTML = time;
        node.scrollIntoView(true);
        message.value = "";
        document.getElementById("messageInput").style.height = "40px"

    }
};
function addFiles() {
    var add = document.getElementById("file_msg");
    if (add.style.visibility == 'hidden') {
        add.style.visibility = 'visible';
    } else {
        add.style.visibility = 'hidden';
    }
}

function chatWith(element, userName) {
    if (userName != chat_user) {
        const old_active_chat = document.getElementById("active_chat");
        old_active_chat.removeAttribute('id');
        element.setAttribute('id', 'active_chat');
        const parent = element.parentNode;
        const node = parent.removeChild(element);
        console.log(node);
        console.log(parent);
        console.log(parent.firstChild.nodeName);
        child = parent.firstChild;
        parent.insertBefore(node, child);
        document.getElementById(userName).style.display = "block";
        document.getElementById(chat_user).style.display = "none";
        //child.style.display = "none";
        chat_user = userName;
    }
}