import { combineReducers } from 'redux';
import authReducer from './auth-reducer';
import rewardsReducer from './rewards-reducer';
import userReducer from './user-reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  rewards: rewardsReducer,
  user: userReducer
});

export default rootReducer;
