export const USER_TOKEN = 'USER_TOKEN';
export const USER_SCORE = 'USER_SCORE';

export const userToken = (value = {}) => ({
  type: USER_TOKEN,
  payload: {
    token: value.token,
    name: value.name,
    email: value.email,
  },
});

export const userScore = (payload) => ({
  type: USER_SCORE,
  payload,
});
