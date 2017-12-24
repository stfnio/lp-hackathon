import React from 'react';
import Avatar from 'material-ui/Avatar';
import '../styles/UserInfo.css';

export default ({ user }) => {
  return (
    <div className="user-info">
      <Avatar className="user-picture" src={user.picture} size={100} />
      <div className="user-name">{user.name}</div>
    </div>
  );
};
