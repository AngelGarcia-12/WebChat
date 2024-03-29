// Make connection
let socket = io.connect('http://localhost:3000');
let socketDeploy = io.connect('https://webchat-message.onrender.com'); 

// Variables
let btnDisable = false;

// Query DOM
let message = document.getElementById('message');
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');


// Emit events
const btnSend = () => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    socketDeploy.emit('chat', {
        message: message.value,
        handle: handle.value
    });
}

message.addEventListener("keyup", function(event) {
    // Verifica si se presionó la tecla Enter (código 13)
    if (event.keyCode === 13) {
      // Cancela el comportamiento predeterminado del formulario
      event.preventDefault();
      // Simula un clic en el botón
      btn.click();
    }
});

const signIn = () => {
    if(btnDisable === false) {
        handle.disabled = !handle.disabled;
        message.disabled = !message.disabled;
    }
}

message.addEventListener('keypress', () => {
    socket.emit('typing', handle.value);
    socketDeploy.emit('typing', handle.value);
})

// Listen for events
socket.on('chat', (data) => {
    feedback.innerHTML = '';
    handle.disabled = !handle.disabled;
    output.innerHTML +=
    '<p><i style="font-size: 24px;" class="fa-solid fa-circle-user"></i> <strong>' 
    + data.handle + ': </strong>' + data.message + '</p>'
    message.value = ''
})

socket.on('typing', (data) => {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>'
})

socketDeploy.on('chat', (data) => {
    feedback.innerHTML = '';
    handle.disabled = !handle.disabled;
    output.innerHTML +=
    '<p><i style="font-size: 24px;" class="fa-solid fa-circle-user"></i> <strong>' 
    + data.handle + ': </strong>' + data.message + '</p>'
    message.value = ''
})

socketDeploy.on('typing', (data) => {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>'
})