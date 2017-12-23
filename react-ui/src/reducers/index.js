import { combineReducers } from 'redux';
import authReducer from './auth-reducer';
import rewardsReducer from './rewards-reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  rewards: rewardsReducer
});

export default rootReducer;