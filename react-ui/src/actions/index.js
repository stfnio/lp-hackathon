import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {
  LOG_IN_USER,
  LOG_OUT_USER,
  FETCH_REWARDS,
  FETCH_REWARD,
  SET_USER
} from './types';

const ROOT_URL = 'http://localhost:5000';

export function logInUser({ tokenId }, redirectToHomePage) {
  return dispatch => {
    axios({
      method: 'post',
      url: `${ROOT_URL}/auth`,
      headers: {
        Authorization: tokenId
      }
    }).then(res => {
      dispatch({
        type: LOG_IN_USER
      });

      localStorage.setItem('token', res.data.token);

      const user = jwt_decode(res.data.token);

      dispatch({ type: SET_USER, payload: user });

      redirectToHomePage();
    });
  };
}

export function logOutUser(redirectToLoginPage) {
  localStorage.removeItem('token');

  return {
    type: LOG_OUT_USER
  };
}

export function fetchRewards() {
  return dispatch => {
    axios({
      method: 'get',
      url: `${ROOT_URL}/api/rewards`,
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }).then(res => {
      dispatch({
        type: FETCH_REWARDS,
        payload: res.data
      });
    });
  };
}

export function fetchReward(id) {
  return dispatch => {
    axios({
      method: 'get',
      url: `${ROOT_URL}/api/rewards/${id}`,
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }).then(res => {
      dispatch({
        type: FETCH_REWARD,
        payload: res.data
      });
    });
  };
}
