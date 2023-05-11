//===============================SOCKET=====================================

const socket = io()

const messageContainer = document.getElementById('message-container')
// const nameInput = document.getElementById('name-input')
const messageForm = document.getElementById('message-form')
const messageInput = document.getElementById('message-input')

messageForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    sendMessage()
})


function sendMessage(){
    console.log(messageInput.value)
    const data = {
        message:messageInput.value
    }

    socket.emit('message',data)
    addMessageToUI(true,data)
    messageInput.value=''
}

socket.on('chat-message',(data)=>{
    // console.log(data)
    addMessageToUI(false,data)
})

function addMessageToUI(ourMessage, data){
    const element = `<li class="${ourMessage ? "message-right" : "message-left"}">
            <p class="message">
                ${data.message}
            </p>
        </li>`

messageContainer.innerHTML += element
}