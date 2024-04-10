const clients = [];

const initSockets = (io) => {
  io.on("connection", (socket) => {
    console.log("client connected", socket.id);

    clients.push(socket)

    socket.on("message", (data) => {
      console.log(data);
      clients.forEach(c => {
        if(c.id !== socket.id) {
            c.emit('message', data);
        }
      })
    });

    socket.on("disconnected", (socket) => {
      console.log("client disconnected", socket.id);
      const cIdx = clients.findIndex(c.id === socket.id)
      clients.splice(cIdx, 1);
    });
  });
};

module.exports = initSockets;
