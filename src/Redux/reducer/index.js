import { USER_TOKEN } from '../actions';

const INITIAL_STATE = {
  toke: '',
};

const userToken = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_TOKEN:
    return { token: action.payload };
  default:
    return state;
  }
};

export default userToken;
