import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUserBalance } from '../actions/index';
import ShowPoints from '../components/ShowPoints';

class UserPoints extends Component {
  componentDidMount() {
    const { updateUserBalance, socket } = this.props;

    socket.on('balanceUpdate', ({ user, balance }) => {
      updateUserBalance(user, balance);
    });
  }

  render() {
    return (
      <div className="user-balance">
        <ShowPoints points={this.props.user.balance} size={25} />
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    user
  };
}

export default connect(mapStateToProps, { updateUserBalance })(UserPoints);
