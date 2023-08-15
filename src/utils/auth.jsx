import Cookies from 'js-cookie';

export const setAuthToken = (token) => {
  // Stocker le token dans un cookie nommé "token" avec une expiration (par exemple, 7 jours)
  Cookies.set('token', token, { expires: 999 });
};

export const getAuthToken = () => {
  // Récupérer le token à partir du cookie
  return Cookies.get('token');
};

export const clearAuthToken = () => {
  // Supprimer le token du cookie
  Cookies.remove('token');
};

export const checkAuth = () => {
  const token = getAuthToken();
  return token !== undefined && token !== null;
};

// export const handleAuthenticatedRequest = async (data) => {
//   try {
//     const token = getAuthToken();
//     const response = await fetch('http://localhost:1337/users/me', {
//       method: 'post',
//       headers: {
//         'Authorization': `Bearer ${token}`, 
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(data)
//     });

//     if (response.ok) {
//       // Traitez la réponse
//     } else {
//       console.error('Request failed');
//     }
//   } catch (error) {
//     console.error('An error occurred', error);
//   }
// };