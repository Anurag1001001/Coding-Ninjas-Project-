class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:5000');

        if (this.userEmail){
            this.connectionHandler();
        }

    }


    connectionHandler(){
        let self = this;

        this.socket.on('connect', function(){
            console.log('connection established using sockets...!');


            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'codeial'
            });

            self.socket.on('user_joined', function(data){
                console.log('a user joined!', data);
            })


        });

        // CHANGE: send a message on clicking  the send message button
        // addEventlistener(whenevr send button clicks this event trigger)
        $('#send-message').click(function(){
            // took the given input value 
            let msg = $('#chat-message-input').val();
            // if msg is not empty then emit it
            if(msg != ''){
                self.socket.emit('send_message',{
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'codeial'
                });
            }
        }); 

        self.socket.on('receive_message', function(data){
            console.log('message received', data.message);

            // create a list element
            let newMessage = $('<li>');

            let messageType = 'other-message';
            if(data.user_email == self.userEmail){
                messageType = 'self-message';
            }
            newMessage.append($('<span>',{
                'html' : data.message
            }));
            newMessage.append($('<sub>',{
                'html': data.user_email
            }));
            console.log(data.user_email)
            newMessage.addClass(messageType);
            $("#chat-message-list").append(newMessage);
        });
    }
}