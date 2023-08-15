import Cookies from 'js-cookie';

export const setAuthToken = (token) => {
  Cookies.set('token', token, { expires: 999 });
};

export const getAuthToken = () => {
  return Cookies.get('token');
};

export const clearAuthToken = () => {
  Cookies.remove('token');
};

export const checkAuth = () => {
  const token = getAuthToken();
  return token !== undefined && token !== null;
};