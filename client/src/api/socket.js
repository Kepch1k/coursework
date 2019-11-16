import React, { useEffect,useState } from 'react';
import io from 'socket.io-client';
import {baseURL} from './baseURL';
import style from './socket.module.scss';
//const socket = io.connect(baseURL);
console.log(baseURL);
const room = "test";
// sending to all clients in 'roomName' room except sender
//socket.to('roomName').emit('event', 'content');
let ChatPage = (props) => {
    const [listOfChats, setListOfChats] = useState([
        {
            name:"Jack",
            photo:"https://www.thiswaifudoesnotexist.net/example-127860.jpg",
            lastMessage:"Air Terra Aqua awdawdawdw",
            dateOfLatestMessage:"THU",
            numberOfUnreadMessages:5
        },
        {
            name:"Jack",
            photo:"https://www.thiswaifudoesnotexist.net/example-127860.jpg",
            lastMessage:"Air Terra Aqua",
            dateOfLatestMessage:"THU",
            numberOfUnreadMessages:55
        },
        {
            name:"Jack",
            photo:"https://www.thiswaifudoesnotexist.net/example-127860.jpg",
            lastMessage:"Air Terra Aqua",
            dateOfLatestMessage:"THU",
            numberOfUnreadMessages:555
        },
        {
            name:"Jack",
            photo:"https://www.thiswaifudoesnotexist.net/example-127860.jpg",
            lastMessage:"Air Terra Aqua",
            dateOfLatestMessage:"THU",
            numberOfUnreadMessages:555
        },
        {
            name:"Jack",
            photo:"https://www.thiswaifudoesnotexist.net/example-127860.jpg",
            lastMessage:"Air Terra Aqua",
            dateOfLatestMessage:"THU",
            numberOfUnreadMessages:555
        },
        {
            name:"Jack",
            photo:"https://www.thiswaifudoesnotexist.net/example-127860.jpg",
            lastMessage:"Air Terra Aqua",
            dateOfLatestMessage:"THU",
            numberOfUnreadMessages:555
        },
        {
            name:"Jack",
            photo:"https://www.thiswaifudoesnotexist.net/example-127860.jpg",
            lastMessage:"Air Terra Aqua",
            dateOfLatestMessage:"THU",
            numberOfUnreadMessages:555
        },
        {
            name:"Jack",
            photo:"https://www.thiswaifudoesnotexist.net/example-127860.jpg",
            lastMessage:"Air Terra Aqua",
            dateOfLatestMessage:"THU",
            numberOfUnreadMessages:555
        },
        {
            name:"Jack",
            photo:"https://www.thiswaifudoesnotexist.net/example-127860.jpg",
            lastMessage:"Air Terra Aqua",
            dateOfLatestMessage:"THU",
            numberOfUnreadMessages:555
        },
        {
            name:"Jack",
            photo:"https://www.thiswaifudoesnotexist.net/example-127860.jpg",
            lastMessage:"Air Terra Aqua",
            dateOfLatestMessage:"THU",
            numberOfUnreadMessages:555
        }]);

    const [listOfMessages, setListOfMessages] = useState([{
        sought:"to",
        message:"sgadgwa awdvwagd wd awd ",
        date:"15:20"
    },
        {
            sought:"from",
            message:"sgadgwa awdvwagd wd awd ",
            date:"15:20"
        },
        {
            sought:"to",
            message:"sgadgwa awdvwagd wd awd sgadgwa awdvwagd wd awd sgadgwa awdvwagd wd awd sgadgwa awdvwagd wd awd sgadgwa awdvwagd wd awd sgadgwa awdvwagd wd awd sgadgwa awdvwagd wd awd sgadgwa awdvwagd wd awd ",
            date:"15:20"
        },
        {
            sought:"from",
            message:"sgadgwa awdvwagd wd awd ",
            date:"15:20"
        },{
            sought:"to",
            message:"sgadgwa awdvwagd wd awd ",
            date:"15:20"
        },
        {
            sought:"from",
            message:"sgadgwa awdvwagd wd awd ",
            date:"15:20"
        },
        {
            sought:"to",
            message:"sgadgwa awdvwagd wd awd sgadgwa awdvwagd wd awd sgadgwa awdvwagd wd awd sgadgwa awdvwagd wd awd sgadgwa awdvwagd wd awd sgadgwa awdvwagd wd awd sgadgwa awdvwagd wd awd sgadgwa awdvwagd wd awd ",
            date:"15:20"
        },
        {
            sought:"from",
            message:"sgadgwa awdvwagd wd awd ",
            date:"15:20"
        }]);


    useEffect(() => {
        // socket.emit('subscribe',room);
        // //socket.emit('unsubscribe',room);
        // console.log(socket);
        // socket.on('itemOfDB', (msg) => console.log('itemOfDB : ', msg.res));
        // socket.on('connected', (msg) => console.log('msg : ', msg.text));
        // socket.on('add', (id) => console.log('socket id : ', id));
        // socket.on('receiveNewMessage', (receivedMessage) => {
        //     setListOfMessages([...listOfMessages,receivedMessage]);
        // });
    });





    const listOfChatsToRender=listOfChats.map((el)=>{
        const latestMessage=(el.lastMessage.length>13)?el.lastMessage.slice(0,12)+"...":el.lastMessage;
        return <div className={style.itemInListOfChats}>
            <div className={style.photo} style={{backgroundImage: "url("+el.photo+")"}}>
            </div>
            <div className={style.nameAndLastMessage}>
                <div >
                    {el.name}
                </div>
                <div >
                    {latestMessage}
                </div>
            </div>
            <div className={style.numberOfUnreadMessagesAndDateOfLatestMessage}>
                <div >
                    {el.dateOfLatestMessage}
                </div>
                <div className={style.numberOfUnreadMessages}>
                    {el.numberOfUnreadMessages}
                </div>
            </div>
        </div>
    });

    const listOfMessagesToRender=listOfMessages.map((el)=>{
        const location =  (el.sought==="to")?"flex-start":"flex-end";
        const color =  (el.sought==="to")?"#c9f4ba":"#ebebeb";

        return <div className={style.messageInChatHistory} style={{alignSelf:location,background:color}}>

                <div className={style.message}>
                    {el.message}
                </div>
                <div className={style.date}>
                    {el.date}
                </div>

        </div>
    });



    return (
        <div className={style.chat} >
            <div className={style.listOfChats} >
                <div className={style.header} >
                    <div className={style.bars}>
                        <i className="fas fa-bars"/>
                    </div>
                    <div className={style.search}>
                        <input type="text" value="search..." />
                    </div>
                </div>
                <div className={style.content} >
                    {listOfChatsToRender}
                </div>
            </div>
            <div className={style.currentChat} >
                <div className={style.header} >
                    <div className={style.name} >
                        Alex
                    </div>
                    <div className={style.lastSeen} >
                        Last seen 5 hours ago
                    </div>
                </div>
                <div className={style.content} >
                    {listOfMessagesToRender}
                </div>
                <div className={style.placeForEnteringMessage}>
                    <textarea //value="search search search search search search search search search search search search search search search search  earch search search search search search search search search search searc search search search search search search search search search search search search search search search search  earch search search search search search search search search search searc"
                    />
                    <i className="fab fa-telegram" onClick={()=>{
                     //   socket.emit('sendNewMessage',{room:room,message:"smth",date:"13:42"});
                        setListOfMessages([...listOfMessages,{
                            sought:"to",
                            message:"smth",
                            date:"13:42"
                        }]);
                    }}/>

                </div>
            </div>
        </div>
    );
};
export default ChatPage;