import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('sectoken');
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    localStorage.setItem('sectoken', JSON.stringify(userToken));
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token
  }
}