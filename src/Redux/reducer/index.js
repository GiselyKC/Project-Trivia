import { USER_TOKEN } from '../actions';

const INITIAL_STATE = {
  token: '',
  name: '',
  email: '',
  score: '',
};

const userToken = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_TOKEN:
    return { token: action.payload.token, name: action.payload.name, email: action.payload.email };
  default:
    return state;
  }
};

export default userToken;
