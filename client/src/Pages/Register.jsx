import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, fetchRegister } from '../redux/slices/auth';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(checkIsAuth);
  const { status } = useSelector((state) => state.auth);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (status) {
      toast(status);
    }
  }, [status]);

  const registerSubmit = () => {
    try {
      dispatch(fetchRegister({ username, password }));
      setPassword('');
      setUsername('');
    } catch (error) {
      console.log(error);
    }
  };
  if (isAuth) navigate('/');
  return (
    <form onSubmit={(e) => e.preventDefault()} className="w-1/4 h-60 mx-auto mt-40">
      <h1 className="text-lg text-white text-center">Регистрация</h1>

      <label htmlFor="" className="text-xs text-gray-400">
        Username:
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:"
        />
      </label>

      <label htmlFor="" className="text-xs text-gray-400">
        Password:
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:"
        />
      </label>

      <div className="flex gap-8 justify-center mt-4">
        <button
          onClick={registerSubmit}
          type="submit"
          className="flex justify-center items-center text-xs bg-gray-600 py-2 px-4 text-white rounded-sm py-w px-4">
          Подтвердить
        </button>
        <Link to="/login" className="flex justify-center items-center text-xs text-white">
          Уже зарегистрированы?
        </Link>
      </div>
    </form>
  );
};

export default Register;
