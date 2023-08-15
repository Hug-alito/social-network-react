import { useState } from 'react';
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { loginAtom } from '../atoms/authAtom2';
import { setAuthToken } from '../utils/auth';

function AuthPage() {
  const [activeForm, setActiveForm] = useState('login');
  const navigate = useNavigate();
  const [,setLoginState] = useAtom(loginAtom);

  const handleTabSwitch = (form) => {
    setActiveForm(form);
  };

  const handleRegistration = async (data) => {
    console.log('Data sent to API:', data);
    try {
      const response = await fetch('http://localhost:1337/api/auth/local/register', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        response.json().then((data) => {
          console.log('User registered successfully');
          console.log('Token:', data.jwt);
          console.log('User:', data.user.username);
          console.log('ID:', data.user.id);
          setAuthToken(data.jwt);
          setLoginState({
            isLoggedIn: true,
            userId: data.user.id,
            token: data.jwt
          });
          navigate('/profile');
        });
      } else {
        console.error('Failed to register user');
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };
  
  const handleLogin = async (data) => {
    console.log('Data sent to API:', data);
    try {
      const response = await fetch('http://localhost:1337/api/auth/local', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        response.json().then((data) => {
          console.log('User logged in successfully');
          console.log('Token:', data.jwt);
          setAuthToken(data.jwt);
          setLoginState({
            isLoggedIn: true,
            userId: data.user.id,
            token: data.jwt
          });
          navigate('/profile');
        });
      } else {
        console.error('Failed to log in user');
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };  

  return (
    <section className="forms-section">
      <div className="forms">
        <div className={`form-wrapper ${activeForm === 'login' ? 'is-active' : ''}`}>
          <button
            type="button"
            className={`switcher switcher-login ${activeForm === 'login' ? 'is-active' : ''}`}
            onClick={() => handleTabSwitch('login')}
          >
            Login
            <span className="underline"></span>
          </button>
          <LoginForm onSubmit={handleLogin} />
        </div>
        <div className={`form-wrapper ${activeForm === 'signup' ? 'is-active' : ''}`}>
          <button
            type="button"
            className={`switcher switcher-signup ${activeForm === 'signup' ? 'is-active' : ''}`}
            onClick={() => handleTabSwitch('signup')}
          >
            Sign Up
            <span className="underline"></span>
          </button>
          <SignupForm onSubmit={handleRegistration} />
        </div>
      </div>
    </section>
  );
}

export default AuthPage;
