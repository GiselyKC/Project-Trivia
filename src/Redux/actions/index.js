
export const USER_TOKEN = 'USER_TOKEN';

export const userToken = (value = {}) => ({
  type: USER_TOKEN,
  payload: {
    token: value.token,
    name: value.name,
    email: value.email,
  }
});

