import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/RewardCard.css';
import ShowPoints from '../components/ShowPoints';

export default ({ reward }) => {
  const imageUrl = `http://localhost:5000/images/${reward.picture}`;

  return (
    <Link to={`rewards/${reward._id}`} className="reward-card">
      <div
        className="reward-card-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="reward-card-price">
          <ShowPoints points={reward.price} />
        </div>
      </div>
      <div className="reward-caption">
        <div className="reward-card-title">{reward.title}</div>
      </div>
    </Link>
  );
};
