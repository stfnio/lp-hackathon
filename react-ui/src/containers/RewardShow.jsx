import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchReward } from '../actions/index';
import '../styles/RewardShow.css';
import ShowPoints from '../components/ShowPoints';

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
        <div
          style={{
            backgroundImage: `url(${imageUrl}`
          }}
          className="reward-image"
        />
        <div className="reward-details">
          <div className="reward-title">{reward.title}</div>
          <div className="reward-description">{reward.description}</div>
          <div style={{ marginBottom: 16 }}>
            <ShowPoints points={reward.price} />
          </div>

          <div className="reward-button">Получить подарок</div>
        </div>
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
