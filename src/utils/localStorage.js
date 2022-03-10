const saveLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const returnLocalStorage = (key) => {
  const getResult = localStorage.getItem(key) || '[]';
  return JSON.parse(getResult);
};

export default {
  saveLocalStorage,
  returnLocalStorage,
};
