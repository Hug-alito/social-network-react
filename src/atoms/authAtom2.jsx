import { atom } from 'jotai';
import { getAuthToken } from '../utils/auth';
import jwt_decode from 'jwt-decode'; // Assurez-vous d'importer le module jwt-decode

const token = getAuthToken();

let initialLoginState = {
  isLoggedIn: false,
  userId: null,
  token: null,
};

if (token) {

  const decodedToken = jwt_decode(token);
  initialLoginState = {
    isLoggedIn: true,
    userId: decodedToken.id,
    token: token,
  };

  console.log(decodedToken)
}

export const loginAtom = atom(initialLoginState);

export const loginActions = {
  login: (set, { userId, username, token }) => {
    set(loginAtom, {
      isLoggedIn: true,
      userId,
      username,
      token,
    });
  },
  logout: (set) => {
    set(loginAtom, initialLoginState);
  },
};
