import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './ActiveUsers.css';

const ActiveUsers = ({ users }) => (
  <div className="textContainer">
    {
      users
        ? (
          <div>
            <h1>People currently in the room:</h1>
            <div className="activeContainer">
              <h2>
                {users.map(({name}) => (
                  <div key={name} className="activeItem">
                    {name}
                    <img alt="Online Icon" src={onlineIcon}/>
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default ActiveUsers;