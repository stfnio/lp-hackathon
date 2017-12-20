import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Route,
  Redirect,
  withRouter
} from 'react-router-dom'

class PrivateRoute extends Component {
  render() {
    const {
      auth,
      Component,
      ...rest
    } = this.props

    return (
      <Route {...rest} render={props => (
        !auth ? (
          <Component {...props}/>
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }}/>
        )
      )}/>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth.authenticated
  }
}

export default withRouter(connect(mapStateToProps)(PrivateRoute))