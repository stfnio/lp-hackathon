import React from 'react';
import Avatar from 'material-ui/Avatar';
import '../styles/UserInfo.css';

export default ({ user }) => {
  return (
    <div className="user-info">
      <Avatar className="user-picture" src={user.picture} size={30} />
      {user.name}
    </div>
  );
};
