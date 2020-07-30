const socket = io('http://localhost:3000')      //where the server is hosted the server.js
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const name = prompt('what is your name')
appendMessage('You Joined')
socket.emit('new-user', name)
socket.on('chat-message', data => {
    console.log(data)
    appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
    //console.log(data)
    appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
    //console.log(data)
    appendMessage(`${name} disconnected`)
})

messageForm.addEventListener('submit', e => {
    //prevents the default submition of a form
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})
function appendMessage(message) {
    let messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}