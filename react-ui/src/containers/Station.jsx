import React, { Component } from 'react';
import { connect } from 'react-redux';

class Station extends Component {
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

export default connect(mapStateToProps)(Station);
