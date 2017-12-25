import React, { Component } from 'react';
import { connect } from 'react-redux';

class TeamsBalance extends Component {
  

  render() {
    return <div>dsfsdf</div>;
  }
}

function mapStateToProps({ team }) {
  return {
    team
  };
}

export default connect(mapStateToProps)(TeamsBalance);
