import React, { useCallback, useState } from 'react';

import axios from '../utils/axios';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchUpdate } from '../redux/slices/post';

const EditPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [oldImage, setOldImage] = useState('');
  const [newImage, setNewImage] = useState('');

  const fetchPost = useCallback(async () => {
    try {
      const { data } = await axios.get(`/posts/${id}`);
      setTitle(data.title);
      setText(data.text);
      setOldImage(data.imageUrl);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const createHandler = async () => {
    try {
        const updatedPost = new FormData()
        updatedPost.append('title', title)
        updatedPost.append('text', text)
        updatedPost.append('id', id)
        updatedPost.append('image', newImage)
        dispatch(fetchUpdate(updatedPost))
        navigate('/posts')
    } catch (error) {
      console.log(error)
    }
  }

  const clearForm = () => {
    setTitle('')
    setText('')
  }

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  return (
    <form onSubmit={(e) => e.preventDefault()} className="w-1/3 mx-auto py-10">
      <label className="text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer">
        Прикрепить изображение
        <input
          type="file"
          className="hidden"
          onChange={(e) => {
            setNewImage(e.target.files[0]);
            setOldImage('');
          }}
        />
      </label>

      <div className="flex object-covere py-2">
        {oldImage && <img src={`http://localhost:3002/${oldImage}`} alt="image" />}
        {newImage && <img src={URL.createObjectURL(newImage)} alt="image" />}
      </div>

      <label className="text-xs text-white opacity-70">
        Заголовок поста
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Заголовок"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
      </label>

      <label className="text-xs text-white opacity-70">
        Текст поста
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Текст поста"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700 resize-none h-40"></textarea>
      </label>

      <div className="flex gap-8 items-center justify-center mt-4">
        <button
          className="flex items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"
          onClick={createHandler}>
          Обновить
        </button>
        <button
          className="flex items-center bg-red-600 text-xs text-white rounded-sm py-2 px-4"
          onClick={clearForm}>
          Очистить
        </button>
      </div>
    </form>
  );
};

export default EditPost;
