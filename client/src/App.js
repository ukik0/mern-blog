import { Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import {ToastContainer} from 'react-toastify'
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import Main from './Pages/Main';
import Posts from './Pages/Posts';
import Post from './Pages/Post';
import AddPost from './Pages/AddPost';
import Login from './Pages/Login';
import Register from './Pages/Register';
import EditPost from './Pages/EditPost';

import { useDispatch } from 'react-redux';
import { getMe } from './redux/slices/auth';

import './App.css';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])
  
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/post/:id/edit" element={<EditPost />} />
        <Route path="new" element={<AddPost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <ToastContainer position='bottom-right'/>
    </Layout>
  );
}

export default App;
