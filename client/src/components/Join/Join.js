import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // link front-end

import './Join.css';

const Join = () => {
    const [name, setName] = useState(''); //name setter function
    const [room, setRoom] = useState(''); //

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">CHAT ROOM</h1>
                <div><input placeholder="Enter your name.." className="joinInput" type="text" onChange={(e) => setName(e.target.value)} autoFocus /></div>
                <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={(e) => setRoom(e.target.value)} /></div>
                <Link onClick = {(e) => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <button className="button mt-20" type="submit">Join</button>
                </Link>
            </div>
        </div>
    );
}

export default Join;
