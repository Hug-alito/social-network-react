import { useState } from 'react';
import PropTypes from 'prop-types';

function LoginForm({ onSubmit }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ identifier, password });
  };

  return (
    <div className="forms">
      <div className="form-wrapper">
        <form className="form form-login" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Please, enter your email and password for login.</legend>
            <div className="input-block">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>
            <div className="input-block">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </fieldset>
          <button type="submit" className="btn-login">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;