const chatForm = document.getElementById('chat-form');
const chatMessage = document.querySelector('.chat-messages');

// Get username and room
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});
// console.log(username, room);
const socket = io();

// Join Chatroom
socket.emit('joinRoom', {username, room });

// Message from Server
socket.on('message', message => {
  console.log(message);
  outPutMessage(message);
  // Scroll down when receiving message
  chatMessage.scrollTop = chatMessage.scrollHeight;
});
// Message Submit
chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const msg = event.target.elements.message.value;
  // Emit the message to server
  socket.emit('chatMessage', msg);
  // Clear the input
  event.target.elements.message.value = '';
  event.target.elements.message.focus();
});

// output message
function outPutMessage(message){
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
  <p class="text">${message.text}</p>
  `;
  document.querySelector('.chat-messages').appendChild(div);
}