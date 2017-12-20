import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logInUser } from '../actions/index'
import GoogleLogin from 'react-google-login'
import { withRouter } from "react-router-dom"

class LogIn extends Component {
  onGoogleLoginSuccess(userData) {
    this.props.logInUser(userData, () => {
      this.props.history.push('/home')
    })
  }

  render() {
    return (
      <GoogleLogin
        clientId="120629828527-jl2cpi3vok1u75s2fdc8sn0tuibbkedu.apps.googleusercontent.com"
        buttonText="LogIn via Google"
        onSuccess={() => this.onGoogleLoginSuccess}
        // onFailure={onGoogleLoginSuccessFailure}
      />
    )
  }
}

export default withRouter(connect(null, { logInUser })(LogIn))