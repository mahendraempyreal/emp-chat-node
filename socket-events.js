var users = [];
const socketHelper = (http) => {
  const io = require("socket.io")(http);

  io.on("connection", function (socket) {
    console.log("User connected", socket.id);
  
    // attach incoming listener for new user
    socket.on("user_connected", function (username) {
      // save in array
      //users[username] = socket.id;
      users.push({
        id: username,
        socketId: socket.id
      });
      console.log('users', users);
      console.log("New User", username, socket.id);
      // socket ID will be used to send message to individual person
      // notify all connected clients
      io.emit("user_connected", socket.id);
    });
    socket.on("send_message", function (data) {
      // send event to receiver
      const socketId = users.find((v)=> v.id == data.receiver_id);
      console.log('socketId', socketId);
      if(socketId){
        io.to(socketId?.socketId).emit("new_message", data);
        console.log("sending msg to "+data.receiver_id);
      }
    });
  
    /* 24-04-2020 */
    socket.on("is_typing", function (data) {
      //var socketId = users[data.receiver_id];
      const socketId = users.find((v)=> v.id == data.receiver_id);
      if(socketId){
        io.to(socketId?.socketId).emit("is_typing", data);
      }
    });
    socket.on("stop_typing", function (data) {
      //var socketId = users[data.receiver_id];
      //io.to(socketId).emit("stop_typing", data);
      const socketId = users.find((v)=> v.id == data.receiver_id);
      if(socketId){
        io.to(socketId?.socketId).emit("stop_typing", data);
      }
    });
  
    /* 25-04-2020 */
    socket.on("delete_message", function (data) {
      //var socketId = users[data.receiver_id];
      //io.to(socketId).emit("delete_message", data);
      const socketId = users.find((v)=> v.id == data.receiver_id);
      if(socketId){
        io.to(socketId?.socketId).emit("delete_message", data);
      }
    });
  
    /* 28-04-2020 */
    socket.on("read_message", function (data) {
      //var socketId = users[data.sender_id];
      //console.log(data.receiver_id);
      //io.to(socketId).emit("read_message", data);
      const socketId = users.find((v)=> v.id == data.receiver_id);
      if(socketId){
        io.to(socketId?.socketId).emit("read_message", data);
      }
    });
  
    /* 21-04-2020 */
    socket.on('disconnect', function() {
      users = users.filter((v)=>v.socketId !== socket.id);
    });
  });
  
  io.on("disconnect", function (socket) {
    console.log("Disconnected", socket.id);
    users = users.filter((v)=>v.socketId !== socket.id);
  });
};

module.exports = socketHelper;