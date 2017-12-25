import { SET_USER, SET_USER_READINESS } from '../actions/types';

export default function(state = { isReady: false }, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.payload };
    case SET_USER_READINESS:
      return { ...state, isReady: action.payload };
    default:
      return state;
  }
}
