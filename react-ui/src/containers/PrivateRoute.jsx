import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import _ from 'lodash';

class PrivateRoute extends Component {
  render() {
    const { auth, roles, component: Component, ...rest } = this.props;

    if (_.includes(roles, 'manager')) {
      return (
        <Route
          {...rest}
          render={props =>
            auth.authenticated && (auth.isManager || auth.isAdmin) ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: '/home',
                  state: { from: props.location }
                }}
              />
            )
          }
        />
      );
    } else if (_.includes(roles, 'admin')) {
      return (
        <Route
          {...rest}
          render={props =>
            auth.authenticated && auth.isAdmin ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: '/home',
                  state: { from: props.location }
                }}
              />
            )
          }
        />
      );
    } else {
      return (
        <Route
          {...rest}
          render={props =>
            auth.authenticated ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: props.location }
                }}
              />
            )
          }
        />
      );
    }
  }
}

function mapStateToProps({ auth }) {
  return {
    auth
  };
}

export default withRouter(connect(mapStateToProps)(PrivateRoute));
