import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchReward } from '../actions/index';
var QRCode = require('qrcode.react');

class RewardQRCode extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchReward(id);
  }

  transitionToRewards = () => {
    this.props.history.push('/rewards');
  };

  render() {
    const { reward, userId } = this.props;

    if (!reward) {
      return <div>Loading...</div>;
    }

    const transaction = JSON.stringify({
      user: userId,
      reward: reward._id
    });

    const imageUrl = `http://localhost:5000/images/${reward.picture}`;

    return (
      <div>
        <div
          style={{
            backgroundImage: `url(${imageUrl}`
          }}
          className="reward-image"
        />
        <div className="reward-details">
          <div className="reward-qr-code-wrapper">
            <div className="reward-qr-code">
              <QRCode value={transaction} size={200} />;
            </div>
          </div>
          <div className="reward-title">{reward.title}</div>
          <div className="reward-description">{reward.description}</div>
          <div
            className="reward-button"
            onClick={() => this.transitionToRewards()}
          >
            Готово
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ rewards, user }, ownProps) {
  return {
    reward: rewards[ownProps.match.params.id],
    userId: user._id
  };
}

export default connect(mapStateToProps, { fetchReward })(RewardQRCode);
