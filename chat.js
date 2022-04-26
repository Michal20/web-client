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
    username: "Joey",
    nickname: "Joey Tribbiany",
    Password: "Joey1234",
    imageurl: "Joe.jpg",
  },
  {
    username: "Pheobe",
    nickname: "Pheobe Buffay",
    Password: "Pheobe123",
    imageurl: "Phobe.jpg",
  },
]
var active_chat_user = '';
var container = document.getElementsByClassName('container')[0];
list_of_users.forEach((element) => {
  const node = document.createElement("button");
  node.className = "user_add_list";
  node.innerHTML = '<div class="chat_people"><span class="chat_img"> <img src = '+ element.imageurl
    +' alt="avatar.png"> </span><span class="chat_ib"> <span class="fw-bold user_chat_name">' + element.nickname
    + '</span></span></div>';
  document.getElementById('users_list').appendChild(node);
  node.onclick = function() {
    addUser(node, element);
  }
  node.setAttribute("type", "button");
})
var input = document.getElementById("messageInput");
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("msg_send_btn").click();
  }
});

var addFile = document.getElementById('addfiles');
var addchatuser = document.getElementById('add_chat_user');
var record = document.getElementById('record');
var addrecord = document.getElementById('record-input');

document.addEventListener('click', function (event) {
  var isblur = true;
  if (!addFile.contains(event.target)) {
    document.getElementById('file_msg').style.visibility = 'hidden';
  }
  if (!addchatuser.contains(event.target)) {
    document.getElementById('box-add').style.visibility = 'hidden';
    isblur = false;
  }
  if (!addrecord.contains(event.target) && !record.contains(event.target)) {
    document.getElementById('record').style.visibility = 'hidden';
    if (!isblur) {
      container.classList.remove('blur-filter');
    }
  }

});
ignoreClickOnMeElement = document.getElementById('addfiles');
document.addEventListener('click', function (event) {
  var isClickInsideElement = ignoreClickOnMeElement.contains(event.target);
  if (!isClickInsideElement) {
    //Do something click is outside specified element
    document.getElementById('file_msg').style.visibility = 'hidden';
  }
});


function addUser(element, user) {
  if (active_chat_user == '') {
    document.getElementsByClassName('type_msg')[0].style.visibility = 'visible';
  }
  const node = document.createElement("button");
  const old_active_chat = document.getElementById("active_chat");
  const old_active_user = document.getElementById(active_chat_user);
  if (typeof (old_active_chat) != 'undefined' && old_active_chat != null) {
    old_active_chat.removeAttribute('id');
  }
  if (typeof (old_active_user) != 'undefined' && old_active_user != null) {
    old_active_user.style.display = "none";
  }
  node.setAttribute('id', 'active_chat');
  node.className = "chat_list";
  node.innerHTML = '<div class="chat_people"><span class="chat_img"> <img src = ' + user.imageurl
    + ' alt="avatar.png"> </span><span class="chat_ib"> <span class="fw-bold user_chat_name">' + user.nickname
    + '</span><span class="user_chat_date"></span><br><p class="user_chat_message"></p></span></div>';
  document.getElementById('inbox_chat').appendChild(node);
  node.setAttribute("type", "button");
  const parent = element.parentNode;
  parent.removeChild(element);
  document.getElementById('box-add').style.visibility = 'hidden';
  addChatMsg(user);
  node.onclick = function () {
    chatWith(node, user.username);
  }
  active_chat_user = user.username;
}
function addChatMsg(user) {
  const node = document.createElement("div");
  const attribute = document.createAttribute('id');
  attribute.value = user.username;
  node.setAttributeNode(attribute);
  node.innerHTML = '<div class="incoming_msg"><div class="received_msg"></div></div><div class="outgoing_msg"></div>';
  node.className = "msg_history";
  console.log(node);
  node.style.display = 'block';
  document.getElementById('msg_history').appendChild(node);
}

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

function sendText() {
  var message = document.getElementById('messageInput');
  if (message.value.trim().length == 0) {
    return false;
  } else {
    const node = document.createElement("div");
    node.className = "outgoing_msg";
    const time = getTime();
    node.innerHTML = '<div class="sent_msg"><p>' + message.value + '</p><span class="time_date">' + time + '</span></div>';
    document.getElementById(active_chat_user).appendChild(node);
    const activeChat = document.getElementById("active_chat");
    const chatMsg = activeChat.getElementsByClassName("user_chat_message");
    const length = message.value.length;
    if (length > 45) {
      message.value = "..." + message.value.slice(length - 46, length - 1);
    }
    chatMsg[0].innerHTML = message.value;
    const chatDate = activeChat.getElementsByClassName("user_chat_date");
    chatDate[0].innerHTML = time;
    document.getElementById('date-time').innerHTML = time;
    node.scrollIntoView(true);
    var element = document.getElementById("active_chat");
    const parent = element.parentNode;
    element = parent.removeChild(element);
    const child = parent.firstChild;
    parent.insertBefore(element, child);
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
  const old_active_chat = document.getElementById("active_chat");
  const old_active_user = document.getElementById(active_chat_user);

  if (typeof (old_active_chat) != 'undefined' && old_active_chat != null) {
    old_active_chat.removeAttribute('id');
  }
  if (typeof (old_active_user) != 'undefined' && old_active_user != null) {
    old_active_user.style.display = "none";
  }
  element.setAttribute('id', 'active_chat');
  document.getElementById(userName).style.display = "block";
  active_chat_user = userName;
}
function addChatUser() {
  const boxAdd = document.getElementById('box-add');
  if (boxAdd.style.visibility == 'visible') {
    boxAdd.style.visibility = 'hidden';
    container.classList.remove('blur-filter');
  } else {
    boxAdd.style.visibility = 'visible';
    container.classList.add('blur-filter');
  }

}
var sendImage = function (event) {
  const imageUrl = URL.createObjectURL(event.target.files[0]);
  const node = document.createElement("div");
  node.className = "outgoing_msg";
  const time = getTime();
  node.innerHTML = '<div class="sent_msg"><img src=' + imageUrl + '>' + '<span class="time_date">' + time + '</span></div>';
  document.getElementById(active_chat_user).appendChild(node);
  const activeChat = document.getElementById("active_chat");
  const chatMsg = activeChat.getElementsByClassName("user_chat_message");
  chatMsg[0].innerHTML = "Image";
  const chatDate = activeChat.getElementsByClassName("user_chat_date");
  chatDate[0].innerHTML = time;
  document.getElementById('date-time').innerHTML = time;
  var element = document.getElementById("active_chat");
  const parent = element.parentNode;
  element = parent.removeChild(element);
  const child = parent.firstChild;
  parent.insertBefore(element, child);
  message.value = "";
  node.scrollIntoView();
}
var sendVideo = function (event) {
  const videoUrl = URL.createObjectURL(event.target.files[0]);
  const node = document.createElement("div");
  node.className = "outgoing_msg";
  const time = getTime();
  node.innerHTML = '<div class="sent_msg"><video controls><source src=' + videoUrl + '>' + '</video><span class="time_date">' + time + '</span></div>';
  document.getElementById(active_chat_user).appendChild(node);
  const activeChat = document.getElementById("active_chat");
  const chatMsg = activeChat.getElementsByClassName("user_chat_message");
  chatMsg[0].innerHTML = "Video";
  const chatDate = activeChat.getElementsByClassName("user_chat_date");
  chatDate[0].innerHTML = time;
  document.getElementById('date-time').innerHTML = time;
  var element = document.getElementById("active_chat");
  const parent = element.parentNode;
  element = parent.removeChild(element);
  const child = parent.firstChild;
  parent.insertBefore(element, child);
  message.value = "";
  node.scrollIntoView();
}
function sendRecord(event) {
  const audioUrl = URL.createObjectURL(event.target.files[0]);
  const node = document.createElement("div");
  node.className = "outgoing_msg";
  const time = getTime();
  node.innerHTML = '<div class="sent_msg"><audio controls><source src=' + audioUrl + '>' + '</audio><span class="time_date">' + time + '</span></div>';
  document.getElementById(active_chat_user).appendChild(node);
  const activeChat = document.getElementById("active_chat");
  const chatMsg = activeChat.getElementsByClassName("user_chat_message");
  chatMsg[0].innerHTML = "Audio";
  const chatDate = activeChat.getElementsByClassName("user_chat_date");
  chatDate[0].innerHTML = time;
  document.getElementById('date-time').innerHTML = time;
  var element = document.getElementById("active_chat");
  const parent = element.parentNode;
  element = parent.removeChild(element);
  const child = parent.firstChild;
  parent.insertBefore(element, child);
  message.value = "";
  node.scrollIntoView();

  //=============================================================
  //const box = document.getElementById('record');
  //box.style.visibility = 'visible';
  //container.classList.add('blur-filter');
}
function getAudio() {

}

