export const USER_TOKEN = 'USER_TOKEN';

export const userToken = (payload) => ({
  type: USER_TOKEN,
  payload,
});
