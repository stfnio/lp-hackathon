import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/RewardCard.css';
import FontIcon from 'material-ui/FontIcon';

export default ({ reward }) => {
  const imageUrl = `http://localhost:5000/images/${reward.picture}`;

  return (
    <Link to={`rewards/${reward._id}`} className="reward-card">
      <div
        className="reward-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="reward-price">
          {reward.price}
          <FontIcon
            className="material-icons"
            style={{
              color: '#fff',
              fontSize: 18,
              marginLeft: 4,
              verticalAlign: 'text-bottom'
            }}
          >
            star
          </FontIcon>
        </div>
      </div>
      <div className="reward-caption">
        <div className="reward-title">{reward.title}</div>
      </div>
    </Link>
  );
};
