import { FETCH_TEAMS } from '../actions/types';
import _ from 'lodash';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_TEAMS:
      return _.mapKeys(action.payload, '_id');
    default:
      return state;
  }
}
