import React, { Component } from 'react';
import '../styles/LogIn.css';
import { connect } from 'react-redux';
import { logInUser } from '../actions/index';
import GoogleLogin from 'react-google-login';
import { withRouter } from 'react-router-dom';
import logo from '../img/Logo.png';

import GoogleIcon from '../components/GoogleIcon';

class LogIn extends Component {
  constructor(props) {
    super(props);

    this.onGoogleLoginSuccess = this.onGoogleLoginSuccess.bind(this);
  }

  onGoogleLoginSuccess(userData) {
    this.props.logInUser(userData, () => {
      this.props.history.push('/home');
    });
  }

  render() {
    return (
      <div className="container">
        <div className="vertical-center">
          <img className="login-logo" src={logo} />
          <h1 className="main-greeting">С новым годом!</h1>
          <div className="login-button-wrapper">
            <GoogleIcon
              style={{
                marginRight: 24,
                color: '#fff'
              }}
              className="google-icon"
            />
            <GoogleLogin
              clientId="120629828527-jl2cpi3vok1u75s2fdc8sn0tuibbkedu.apps.googleusercontent.com"
              buttonText="Начать вечеринку"
              onSuccess={this.onGoogleLoginSuccess}
              className="login-button"
              // onFailure={onGoogleLoginSuccessFailure}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, { logInUser })(LogIn));
