const ws = new WebSocket(window.location.origin.replace(/^http/, 'ws'));

ws.onmessage = ({ data }) => {
  console.log('<>>>>message', data);
};

ws.onopen = () => {
  ws.send('fsdfdfds');
};

document.forms['send-form'].addEventListener('submit', (event) => {
  event.preventDefault();
  ws.send(event.target.message.value);
});
