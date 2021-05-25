//node server that will handle socketio connections
const io = require("socket.io")(8000, {
  cors: {
    origin: "*",
  },
});
const users = {};

io.on('connection', socket =>{
    socket.on('new-user-joined', name=>{
      // If any new user joins, let the active users know
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    // If someone sends a message, let others know
    socket.on('send', message =>{
        socket.broadcast.emit('receive',{message: message, name: users[socket.id]})
    });

  // If someone leaves, inform other members
     socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });

})