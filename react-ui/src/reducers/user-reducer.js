import { SET_USER, UPDATE_USER_BALANCE } from '../actions/types';

export default function(state = { isReady: false }, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.payload };
    case UPDATE_USER_BALANCE:
      return { ...state, balance: action.payload };
    default:
      return state;
  }
}
