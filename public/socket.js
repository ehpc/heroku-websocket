const ws = new WebSocket(window.location.origin.replace(/^http/, 'ws'));

ws.onmessage = (event) => {
  console.log(event.data);
};
