import { USER_TOKEN, SET_TIME } from '../actions';

const INITIAL_STATE = {
  token: '',
  name: '',
  email: '',
  score: '',
  time: 30,
};

const userToken = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_TOKEN:
    return {
      token: action.payload.token,
      name: action.payload.name,
      email: action.payload.email };
  case SET_TIME:
    return {
      ...state,
      time: action.payload,
    };
  default:
    return state;
  }
};

export default userToken;
