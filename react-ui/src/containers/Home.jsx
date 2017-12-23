import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRewards } from '../actions';

import RewardCard from '../components/RewardCard';

class Home extends Component {
  componentWillMount() {
    this.props.fetchRewards();
  }

  renderRewards() {
    return this.props.rewards.map(reward => {
      return (
        <div key={reward._id}>
          <RewardCard reward={reward} />
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <div>Home</div>
        {this.renderRewards()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    rewards: state.rewards
  };
}

export default connect(mapStateToProps, { fetchRewards })(Home);
