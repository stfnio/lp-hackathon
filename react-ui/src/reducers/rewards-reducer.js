import { FETCH_REWARDS } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_REWARDS:
      return [...state, action.payload];
    default:
      return state;
  }
}
