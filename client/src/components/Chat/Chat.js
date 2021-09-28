import React,{ useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import ActiveUsers from '../ActiveUsers/ActiveUsers';

let socket;

const Chat = ({location}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    // const ENDPOINT = 'localhost:5000';
    const ENDPOINT = 'https://chat-room-web.herokuapp.com/';

    useEffect(() => {
        const {name,room} = queryString.parse(location.search);

        socket = io(ENDPOINT,{
            withCredentials: false,
            transportOptions: {
                polling: {
                    extraHeaders: {
                        "my-custom-header": "abcd"
                    }
                }
            }

        });

        setName(name);
        setRoom(room);

        socket.emit('join',{name, room}, () => {

        });

        return () => {
            socket.emit('disconnected');
            socket.off();
        }
    }, [ENDPOINT, location.search]); //useEffect when values change for only once

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });

    }, [messages]);

    // fn for sending messages
    const sendMessage = (e) => {
        e.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }
    console.log(message, messages)

    return (
        <div className ="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <ActiveUsers users={users}/>
        </div>
    )
}

export default Chat;
