//Declaring variables
const socket = io();
let chatBox = document.getElementById("chatBox");
let user;

// This function will trigger a pop up window every time a user connects to the page.
Swal.fire({
  title: "Sign in",
  text: "Enter with email account",
  input: "text",
  confirmButtonText: "Cool",
  allowOutsideClick: false,
  inputValidator: (value) => {
    if (!value) {
      // In case the input does not recieve anything from the user it will ask it again.
      return "You need to enter an email address";
    }
  },
}).then((result) => {
  if (result.value) {
    // User is pulled from the HTML and then sent over a websocket protocol to the server
    user = result.value;
    socket.emit("new-user", { user: user });
  }
});

// This function connects to the server and recieves users who
//joinned in another socket (as it is a broadcast only the other
// sockets except the one who joinned will be notified). It will display an alert at the top of the window.
socket.on("new-user-connected", (data) => {
  Swal.fire({
    text: `${data.user} joined the chat`,
    toast: true,
    position: "top-end",
  });
});

//When the user interacts with the chat, the client side sends the message and the user to the server.
chatBox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    if (chatBox.value.trim().length > 0) {
      socket.emit("message", {
        id: socket.id,
        user: user,
        message: chatBox.value,
      });
      chatBox.value = "";
    }
  }
});

// The server sends the data from the message with the user back so it generates the chat incrementaly.
// The data now is comming directly from the database.
socket.on("messageLogs", (data) => {
  let log = document.getElementById("messageLogs");
  let message = "";
  data.forEach((elem) => {
    message += `
      <div class="chat-message">
      <div class="message-bubble">
        <div class="message-sender">${elem.user}</div>
        <p>${elem.message}</p>
        </div>
      </div>
    `;
  });

  log.innerHTML = message;
});

// This function generates a history for the chat so when a new user joins, it can see the messages that
// were sent befeore it joinned.
// When this new user interacts with the chat, the history will not disapear.
function firstLoad() {
  let log = document.getElementById("messageLogs");

  fetch("/messages")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let message = "";
      data.forEach((elem) => {
        message += `
      <div class="chat-message">
        <div class="message-bubble">
          <div class="message-sender">${elem.user}</div>
          <p>${elem.message}</p>
        </div>
      </div>
      `;
      });
      log.innerHTML = message;
    });
}

firstLoad();
