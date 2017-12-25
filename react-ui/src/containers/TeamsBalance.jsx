import React, { Component } from 'react';
import { connect } from 'react-redux';

class TeamsBalance extends Component {
  componentDidMount() {

  }

  render() {
    return <div>dsfsdf</div>;
  }
}

function mapStateToProps({ user, team }) {
  return {
    user,
    team
  };
}

export default connect(mapStateToProps)(TeamsBalance);
