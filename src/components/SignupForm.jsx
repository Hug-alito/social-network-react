import { useState } from 'react';
import PropTypes from 'prop-types';

function SignupForm({ onSubmit }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ username, email, password });
  };

  return (
    <div className="forms">
      <div className="form-wrapper">
        <form onSubmit={handleSubmit} className="form form-signup">
          <fieldset>
            <legend>Please, enter your email, password and password confirmation for sign up.</legend>
            <div className="input-block">
              <label htmlFor="signup-username">Username</label>
              <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="input-block">
              <label htmlFor="signup-email">E-mail</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="input-block">
              <label htmlFor="signup-password">Password</label>
              <input type="password" id="signup-password" required />
            </div>
            <div className="input-block">
              <label htmlFor="signup-password-confirm">Confirm password</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </fieldset>
          <button type="submit" className="btn-signup">Continue</button>
        </form>
      </div>
    </div>
  );
}

SignupForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SignupForm;
