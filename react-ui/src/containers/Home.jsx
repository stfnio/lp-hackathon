import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRewards } from '../actions';
import _ from 'lodash';

import RewardCard from '../components/RewardCard';

class Home extends Component {
  componentDidMount() {
    this.props.fetchRewards();
  }

  renderRewards() {
    return _.map(this.props.rewards, reward => {
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
