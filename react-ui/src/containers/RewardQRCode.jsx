import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchReward } from '../actions/index';
var QRCode = require('qrcode.react');

class RewardQRCode extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchReward(id);
  }

  render() {
    const { reward, userId } = this.props;

    if (!reward) {
      return <div>Loading...</div>;
    }

    const transaction = JSON.stringify({
      user: userId,
      reward: reward._id
    });

    return <QRCode value={transaction} size={280} />;
  }
}

function mapStateToProps({ rewards, user }, ownProps) {
  return {
    reward: rewards[ownProps.match.params.id],
    userId: user._id
  };
}

export default connect(mapStateToProps, { fetchReward })(RewardQRCode);
