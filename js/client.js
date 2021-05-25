const socket = io('http://localhost:8000');
const form = document.getElementById('send-container');

const messageInput = document.getElementById('messageInp');

const messageContainer = document.querySelector(".container");

var audio = new Audio('ping.mp3');

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position)
    messageContainer.append(messageElement);
    
    if(position == 'left' || position == 'center'){
        audio.play();
    }
}

const name = prompt("Enter your name to join: ", "Anonymous");
socket.emit('new-user-joined', name);

// When a user joins the chat
socket.on('user-joined',name =>{
    if(name.length == 0){
    append(`Anonymous joined the chat`, 'center');
    }
    else{
        append(`${name} joined the chat`, 'center');
    }
})

// If user receives a message
socket.on('receive',data =>{
    var msger = `${data.message}`;
    console.log(msger.length);
    if(name.length == 0){
        append(`Anonymous: ${data.message}`, 'left');
    }
    else{
        append(`${data.name}: ${data.message}`, 'left');
    }
})

// When a user leaves the chat
socket.on('left',name =>{
    if(name.length == 0){
        append(`Anonymous left`, 'center');
    }
    else{
        append(`${name} left`, 'center');
    }
})

form.addEventListener('submit', (e)=>{
e.preventDefault();
const message = messageInput.value;
append(`You: ${message}`, 'right');
socket.emit('send', message );
messageInput.value = '';
})
