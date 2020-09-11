const messages = document.getElementById('messages');
const ws = new WebSocket(window.location.origin.replace(/^http/, 'ws'));

ws.onmessage = ({ data }) => {
  messages.innerHTML += `<dt>${data}</dt>`;
};

document.forms.sendForm.addEventListener('submit', (event) => {
  event.preventDefault();
  ws.send(event.target.message.value);
});
