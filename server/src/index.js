import express from 'express';
import router from './server/router/index';
import cors from 'cors';

//const connect = require('./server/mongo/connection');
//const Chat = require('./server/mongo/mongoModels/participantModel');

const funcErrorHandling = require('./server/middleWare/funcErrorHandling');
const PORT = process.env.PORT || 3000;
const app = express();

app.use("/static", express.static(__dirname + "/server/tmp/"));
app.use(cors());
app.use(express.json());

app.use('/api',router);//router
//app.use(()=>{console.log("api request")} );
app.use(funcErrorHandling);

const server = require("http").createServer(app);
const io = require('socket.io')(server);
const users=[];
const connections =[];
//io.sockets.emit('hi', 'everyone');
io.sockets.on('connection', function (socket) {
    connections.push(socket);
    console.log('user connection');
    socket.on('disconnect',function(data){
        connections.splice(connections.indexOf(socket),1);
        console.log('user unconnection');
    });
    socket.emit('connected', {text: 'Your connected !'});



    socket.on('sendNewMessage',async function(sendedMessage){
        const {room, message, date}=sendedMessage;
        try{
            console.log(sendedMessage);
           /// await socket.join('test');
         //   console.log(socket.rooms);
         //   console.log('[socket]','join room :',room);
        //    console.log(socket.rooms[room]);

            /*

            .then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR ! ", err);
})


            * */


            socket.to(socket.rooms[room]).emit('receiveNewMessage', {sought:"from",message:message,date:date});
           /* connect.then(db  =>  {
                console.log("connected correctly to the server",db);

                let  chatMessage  =  new Chat({ message: message, sender: "Anonymous"});
                chatMessage.save();
                Chat.find({}).then(chat  =>  {
                    socket.emit('itemOfDB',{res:chat});
                    console.log("*****************************contain in db mongo",chat);

                }).catch((e)=>{
                    console.log("//////////////////////////////error in db mongo",e);
                });

            });*/
           // console.log('msg sendesd',connect);
        }catch(e){
            console.log('[error]','join room :',e);
            socket.emit('error','couldnt perform requested action');
        }
    });

    socket.on('subscribe',async function(room){
        try{
            console.log(socket.rooms);
            await socket.join('test');
            console.log(socket.rooms);
            console.log('[socket]','join room :',room);
            console.log(socket.rooms[room]);
            socket.to(socket.rooms[room]).emit('add', socket.id);
            console.log('user joined');
        }catch(e){
            console.log('[error]','join room :',e);
            socket.emit('error','couldnt perform requested action');
        }
    });



    socket.on('unsubscribe',function(room){
    try{
        console.log('[socket]','leave room :', room);
        socket.leave(room,()=>{console.log(socket.rooms);});
        socket.to(room).emit('user left', socket.id);
    }catch(e){
        console.log('[error]','leave room :', e);
        socket.emit('error','couldnt perform requested action');
    }
});


});



server.listen(PORT,() => console.log(`Example app listening on port ${PORT}!`));

//res.redirect('http://192.168.0.111:5000/');