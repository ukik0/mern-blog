import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { checkIsAuth, logOut } from '../redux/slices/auth';

const Navbar = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(checkIsAuth);
  const navigate = useNavigate()

  const logoutHandler = () => {
    dispatch(logOut())
    localStorage.removeItem('token')
    toast('Выход успешно выполнен')
    navigate('/login')
  }

  const activeStyles = {
    color: 'white',
  };

  return (
    <div className="flex py-4 justify-between items-center">
      <span className="flex justify-center items-center w-6 h-6 bg-gray-600 text-xs text-white rounded-sm">
        e
      </span>

      {isAuth && (
        <ul className="flex gap-8">
          <li>
            <NavLink
              to="/"
              className="text-xs text-gray-400 hover:text-white"
              style={({ isActive }) => (isActive ? activeStyles : undefined)}>
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/posts"
              className="text-xs text-gray-400 hover:text-white"
              style={({ isActive }) => (isActive ? activeStyles : undefined)}>
              Мои посты
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/new"
              className="text-xs text-gray-400 hover:text-white"
              style={({ isActive }) => (isActive ? activeStyles : undefined)}>
              Добавить пост
            </NavLink>
          </li>
        </ul>
      )}

      <div className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2">
        {isAuth ? <button onClick={logoutHandler}>Выйти</button> : <Link to='/login'>Войти</Link>}
      </div>
    </div>
  );
};

export default Navbar;