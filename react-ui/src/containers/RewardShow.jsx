import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchReward } from '../actions/index';

class RewardShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchReward(id);
  }

  render() {
    const { reward } = this.props;

    if (!reward) {
      return <div>Loading...</div>;
    }

    const imageUrl = `http://localhost:5000/images/${reward.picture}`;

    return (
      <div>
        {reward.title}
        <img src={imageUrl} />
      </div>
    );
  }
}

function mapStateToProps({ rewards }, ownProps) {
  return {
    reward: rewards[ownProps.match.params.id]
  };
}

export default connect(mapStateToProps, { fetchReward })(RewardShow);
