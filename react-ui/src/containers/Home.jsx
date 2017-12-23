import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import * as actions from '../actions';

export default class Home extends Component {
  componentWillMount() {
    this.props.fetchMessage();
  }

  render() {
    return (
      <div>Home</div>
      // <div className="msg">{this.props.message}</div>
    );
  }
}

// function mapStateToProps(state) {
//   return { message: state.auth.message };
// }

// export default connect(mapStateToProps, actions)(ProtectedContent);