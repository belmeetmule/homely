import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUser } from 'react-icons/fa';
import { HiOutlineMailOpen } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { IoCaretBackOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { fetchCurrentUser, login } from '../../Redux/Reducers/authSlice';
import './Login.scss';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);
  const token = localStorage.getItem('token');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // console.log('Token:', token);
    if (token && isLoggedIn) {
      // console.log('logged in');
      setTimeout(() => {
        navigate('/');
      }, 100);
    }
  }, [isLoggedIn, token, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log('Form submitted:', email, password);
    dispatch(login({ email, password }))
      .then(() => {
        dispatch(fetchCurrentUser());
      });
  };

  return (
    <section className="login-section">
      <div className="loginIcon"><FaUser /></div>
      <h2>Welcome back</h2>

      <form onSubmit={handleSubmit}>
        <h4>Member Login</h4>
        <div className="form-group">
          <span className="icon"><HiOutlineMailOpen /></span>
          <input
            type="email"
            className="form-control"
            id="Email1"
            placeholder="Useremail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="form-group">
          <span className="icon"><RiLockPasswordLine /></span>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
        </div>

        <button type="submit" className="login-btn">Login</button>
        <Link to="/">
          <button type="button" aria-label="Go back"><IoCaretBackOutline /></button>
        </Link>
      </form>
      <p>
        New here?
        {' '}
        <Link to="/register" style={{ textDecoration: 'none' }}>
          Register
        </Link>
      </p>
    </section>
  );
};

export default Login;
