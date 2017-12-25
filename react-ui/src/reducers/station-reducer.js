import { FETCH_STATION } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_STATION:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
