import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRewards } from '../actions';
import _ from 'lodash';
import '../styles/RewardList.css'

import RewardCard from '../components/RewardCard';

class RewardList extends Component {
  componentDidMount() {
    this.props.fetchRewards();
  }

  render() {
    const { rewards } = this.props;

    return (
      <div className="reward-list">
        {_.map(rewards, reward => (
          <RewardCard reward={reward} key={reward._id} />
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    rewards: state.rewards
  };
}

export default connect(mapStateToProps, { fetchRewards })(RewardList);
