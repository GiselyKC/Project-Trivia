// import { returnLocalStorage } from '../utils/localStorage';

export default async function getRequestTrivia() {
  const url = 'https://opentdb.com/api_token.php?command=request';
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.token;
  } catch (error) {
    console.log(error);
  }
}

export async function getGameTrivia(getToken) {
  const url = `https://opentdb.com/api.php?amount=5&token=${getToken}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
