import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import { fetchCreate } from '../redux/slices/post';
import { useNavigate } from 'react-router-dom';

const AddPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector((state) => state.posts.status);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState('');

  const createHandler = () => {
    try {
      const data = new FormData();
      data.append('title', title);
      data.append('text', text);
      data.append('image', image);
      dispatch(fetchCreate(data));
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  };

  const clearForm = () => {
    setText('');
    setTitle('');
    setImage('');
  };

  useEffect(() => {
    if (status) toast(status);
  }, [status]);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="w-1/3 mx-auto py-10">
      <label className="text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer">
        Прикрепить изображение
        <input type="file" className="hidden" onChange={(e) => setImage(e.target.files[0])} />
      </label>

      <div className="flex object-covere py-2">
        {image && <img src={URL.createObjectURL(image)} alt="image" />}
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
          Добавить
        </button>
        <button
          className="flex items-center bg-red-600 text-xs text-white rounded-sm py-2 px-4"
          onClick={clearForm}>
          Отменить
        </button>
      </div>
    </form>
  );
};

export default AddPost;
