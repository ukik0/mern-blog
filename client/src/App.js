import { Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';

import Main from './Pages/Main';
import Posts from './Pages/Posts';
import Post from './Pages/Post';
import AddPost from './Pages/AddPost';
import Login from './Pages/Login';
import Register from './Pages/Register';

import './App.css';
import EditPost from './Pages/EditPost';

function App() {
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
    </Layout>
  );
}

export default App;
