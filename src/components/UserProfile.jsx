import { useAtom } from 'jotai';
import { loginAtom } from '../atoms/authAtom2';
import { useState, useEffect } from 'react';


function UserProfile() {
  const [loginState] = useAtom(loginAtom);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/users/me', {
          method: 'get',
          headers: {
            'Authorization': `Bearer ${loginState.token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUserData(userData);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('An error occurred', error);
      }
    };

    fetchUserData();
  }, [loginState.token]);

  return (
    <div className="user-profile">
      <h1>Profil de l&apos;utilisateur</h1>
      {userData && (
        <div className="user-details">
          <p>Nom d&apos;utilisateur : {userData.username}</p>
          <p>Adresse e-mail : {userData.email}</p>
          {/* Ajoutez d'autres informations de profil ici */}
        </div>
      )}
    </div>
  );
}

export default UserProfile;