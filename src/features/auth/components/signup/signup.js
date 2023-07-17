import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../../contexts/AuthContext';
import './signup.module.scss';
import { useNavigate } from 'react-router-dom';

function SignUp(props) {
  const {
    registerUser,
    authState: { role },
  } = useContext(AuthContext);
  const [registerError, setRegisterError] = useState('');
  const [registerForm, setRegisterForm] = useState({
    username: '',
    phone: '',
    password: '',
  });
  const { username, phone, password } = registerForm;
  const onchangeRegisterForm = event =>
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });

  const register = async event => {
    try {
      event.preventDefault();
      const registerData = await registerUser(registerForm);
      if (registerData.success) {
        alert('Please verify account in your email');
      } else {
        setRegisterError(registerData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="auth-inner">
      <form onSubmit={register}>
        <h3>Sign Up</h3>

        <div className="mb-3">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            required
            name="username"
            value={username}
            onChange={onchangeRegisterForm}
          />
        </div>

        <div className="mb-3">
          <label>Phone Number</label>
          <input
            type="phone"
            className="form-control"
            placeholder="Enter phone number"
            required
            name="phone"
            value={phone}
            onChange={onchangeRegisterForm}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            required
            name="password"
            value={password}
            onChange={onchangeRegisterForm}
          />
        </div>
        <div
          style={{
            color: 'red',
            'font-size': '12px',
            'margin-bottom': '10px',
            'padding-left': '5px',
          }}
        >
          <i>{registerError}</i>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
    </div>
  );
}
export default SignUp;