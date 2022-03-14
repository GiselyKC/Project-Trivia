export const USER_TOKEN = 'USER_TOKEN';
export const SET_TIME = 'SET_TIME';

export const userToken = (value = {}) => ({
  type: USER_TOKEN,
  payload: {
    token: value.token,
    name: value.name,
    email: value.email,
  },
});

export const setTime = (value) => ({
  type: SET_TIME,
  payload: value,
});
