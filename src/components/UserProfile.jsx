import { useAtom } from 'jotai';
import { loginAtom } from '../atoms/authAtom2';
import { useState, useEffect } from 'react';

function UserProfile() {
  const [loginState] = useAtom(loginAtom);
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');

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
          setUsername(userData.username);
          setDescription(userData.description);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('An error occurred', error);
      }
    };

    fetchUserData();
  }, [loginState.token]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:1337/api/users/me', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${loginState.token}`,
        },
        body: JSON.stringify({
          username: username,
          description: description,
        }),
      });

      if (response.ok) {
        console.log('Profile updated successfully');
        fetchUserData();
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  return (
    <div className="user-profile">
      <h1>Profil de l&apos;utilisateur</h1>
      {userData && (
        <div className="user-details">
          <p>Nom d&apos;utilisateur : {userData.username}</p>
          <p>Adresse e-mail : {userData.email}</p>
          <form onSubmit={handleUpdateProfile}>
            <label>
              Nouveau nom d&apos;utilisateur:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label>
              Nouvelle description:
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <button type="submit">Mettre à jour le profil</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
