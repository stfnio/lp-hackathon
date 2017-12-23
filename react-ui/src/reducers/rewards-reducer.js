import { FETCH_REWARDS, FETCH_REWARD } from '../actions/types';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_REWARDS:
      return _.mapKeys(action.payload, '_id');
    case FETCH_REWARD:
      const reward = action.payload;
      return { ...state, [reward._id]: reward };
    default:
      return state;
  }
}
