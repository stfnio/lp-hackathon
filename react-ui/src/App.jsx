import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GoogleLogin from 'react-google-login'
import axios from 'axios'

const responseGoogle = response => {
  axios({
    method: 'post',
    url: 'http://localhost:5000/auth',
    headers: { 'Authorization': response.tokenId }
  })
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <GoogleLogin
          clientId="120629828527-jl2cpi3vok1u75s2fdc8sn0tuibbkedu.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
      </div>
    );
  }
}

export default App;
