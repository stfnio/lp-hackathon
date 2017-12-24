import React from 'react';
import FontIcon from 'material-ui/FontIcon';

export default ({ points, size }) => {
  return (
    <div>
      {points}
      <FontIcon
        className="material-icons"
        style={{
          color: '#fff',
          fontSize: size ? size : 18,
          marginLeft: 4,
          verticalAlign: 'text-bottom'
        }}
      >
        star
      </FontIcon>
    </div>
  );
};
