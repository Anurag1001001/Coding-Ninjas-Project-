module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer,{
        // I don't know what cors is but without these line in a newer version socket won't be abl e to communicate
        cors: {
            origin: '*',
          }
    });
    //  when the connection request made by the client side this funtion will get executed
    io.sockets.on('connection', function(socket){
        console.log('new connection received ', socket.id);
        
        socket.on('disconnect', function(){
            console.log('socket disconnected');
        });

        // .on is an socket event listener just like addEventListener in javascript
        socket.on('join_room', function(data){
            console.log('joining request received ', data);
            //  Now once joinin request reeceived socket should join to that particular room.
            //  if chatroom with this name(codeial mentioned in client side) is present then user will be entered or joiin that chatroom or if its not exist then it will create that chatroom and entered to that room.

            socket.join(data.chatroom);

            //  Now as i joined the room then i should tell to everyone who all already  present in that room that of my joining

            //  to emit in a specific chatroom we do this
            io.in(data.chatroom).emit('user_joined', data);
        });
        
        // CHANGE:: detect send message and broadcast to everyone in the room
        socket.on('send_message', function(data){
            io.in(data.chatroom).emit('receive_message', data);
        }); 

    })
    

}