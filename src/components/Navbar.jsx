import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAtom } from 'jotai';
import { loginAtom, loginActions } from '../atoms/authAtom2';
import { clearAuthToken } from '../utils/auth';

function Navbar() {
  const [loginState, setLoginState] = useAtom(loginAtom);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuthToken();
    loginActions.logout(setLoginState); // Mettre à jour l'état de connexion
    navigate('/auth');
  };

  return (
    <nav className="navbar">
        <Link to="/" className="nav-link">Accueil</Link>
        {loginState.isLoggedIn ? (
          <>
            <Link to="/profile" className="nav-link">Mon profil</Link>
            <button onClick={handleLogout}>Déconnexion</button>
          </>
        ) : (
          <Link to="/auth" className="nav-link">S&apos;inscrire</Link>
        )}
    </nav>
  );
}

Navbar.propTypes = {
  toggleMode: PropTypes.func.isRequired,
};

export default Navbar;
