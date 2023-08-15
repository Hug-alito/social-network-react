import { atom } from 'jotai';

export const authAtom = atom({
  isLoggedIn: false,
  username: '',
  token: '',
});

export const authActions = {
  login: (get, set, { username, token }) => {
    set(authAtom, { isLoggedIn: true, username, token });
  },
  logout: (get, set) => {
    set(authAtom, { isLoggedIn: false, username: '', token: '' });
  },
  setAuthToken: (set, token) => {
    set(authAtom, (prev) => ({ ...prev, token }));
  },
};
