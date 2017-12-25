import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchReward } from '../actions/index';
import '../styles/RewardShow.css';
import ShowPoints from '../components/ShowPoints';
import Button from '../components/Button';

class RewardShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchReward(id);
  }

  showQRCode = () => {
    this.props.history.push(`${this.props.location.pathname}/qr-code`);
  };

  render() {
    const { reward } = this.props;

    if (!reward) {
      return <div>Loading...</div>;
    }

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
          <div className="reward-title">{reward.title}</div>
          <div className="reward-description">{reward.description}</div>
          <div style={{ marginBottom: 16 }}>
            <ShowPoints points={reward.price} />
          </div>

          <Button title="Получить подарок" onClick={() => this.showQRCode()} />
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
