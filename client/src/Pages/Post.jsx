import React, { useState } from 'react';
import Moment from 'react-moment';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AiFillDelete, AiFillEye, AiOutlineMessage, AiTwotoneEdit } from 'react-icons/ai';

import axios from '../utils/axios';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDeletePost } from '../redux/slices/post';
import { toast } from 'react-toastify';

const Post = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [post, setPost] = useState();
  const { id } = useParams();

  const fetchPost = useCallback(async () => {
    try {
      const { data } = await axios.get(`/posts/${id}`);
      setPost(data);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const deletePostHandler = () => {
    dispatch(fetchDeletePost(id));
    toast('Удаление прошло успешно');
    navigate('/');
  };

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  if (!post) {
    return <div className="text-xl text-center text-white py-10">Постов нет</div>;
  }

  return (
    <div>
      <Link
        to="/"
        className="flex justify-center items-center bg-gray-600 text-xs to-white rounded-sm py-2 px-4 w-1/6">
        Назад
      </Link>

      <div className="flex gap-10 py-8">
        <div className="w-2/3">
          <div className="flex flex-col basis-1/4 flex-grow">
            <div className="">
              <div className={post.imageUrl ? 'flex rounded-sm h-80' : 'flex rounded-sm'}>
                {post.imageUrl && (
                  <img
                    src={`http://localhost:3002/${post.imageUrl}`}
                    alt="img"
                    className="object-cover w-full"
                  />
                )}
              </div>

              <div className="flex justify-between items-center pt-2">
                <div className="text-xs text-white opacity-50">{post.username}</div>
                <div className="text-xs text-white opacity-50">
                  <Moment date={post.create} format="D MMM YYYY" />
                </div>
              </div>

              <div className="text-white text-xl">{post.title}</div>
              <p className="text-white opacity-60 text-xs pt-4">{post.text}</p>

              <div className="flex gap-3 mt-2 items-center justify-between">
                <div className="flex gap-3 mt-4">
                  <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                    <AiFillEye />
                    <span>{post.views}</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                    <AiOutlineMessage />
                    <span>{post.comments?.length || 0}</span>
                  </button>
                </div>

                {user?._id === post.author && (
                  <div className="flex gap-3 mt-4">
                    <button className="flex items-center justify-center gap-2  text-white opacity-50">
                      <Link to={`/post/${id}/edit`}>
                        <AiTwotoneEdit />
                      </Link>
                    </button>
                    <button
                      onClick={deletePostHandler}
                      className="flex items-center justify-center gap-2  text-white opacity-50">
                      <AiFillDelete />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/3">Comments</div>
      </div>
    </div>
  );
};

export default Post;
