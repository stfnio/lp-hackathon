import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchReward } from '../actions/index';
import QRCode from 'qrcode.react';
import '../styles/RewardShow.css';
import Button from '../components/Button';

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

    const imageUrl = `${window.ROOT_URL}/images/${reward.picture}`;

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
              <QRCode value={transaction} size={150} />;
            </div>
          </div>
          <div className="reward-title">{reward.title}</div>

          <Button title="Готово" onClick={() => this.transitionToRewards()} />
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
