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
import { fetchComments, fetchPostComments } from '../redux/slices/comments';
import CommentItem from '../Components/CommentItem';

const Post = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const { id } = useParams();

  const [comments, setComment] = useState('');
  const [post, setPost] = useState();
  const cms = useSelector((state) => state.comments.comments)
  

  const fetchPost = useCallback(async () => {
    try {
      const { data } = await axios.get(`/posts/${id}`);
      setPost(data);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const handleSubmit = () => {
    try {
      const postId = id;
      dispatch(fetchComments({ postId, comments }));
      setComment('');
    } catch (error) {
      console.log(error);
    }
  };

  const deletePostHandler = () => {
    dispatch(fetchDeletePost(id));
    toast('Удаление прошло успешно');
    navigate('/');
  };

  const fetchAllComments = async () => {
    const postId = id;
    try {
      dispatch(fetchPostComments({ postId }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    fetchAllComments()
  }, []);

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
        <div className="w-1/3 p-8 bg-gray-700 flex flex-col gap-2 rounded-sm">
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
            <input
              value={comments}
              onChange={(e) => setComment(e.target.value)}
              type="text"
              placeholder="comment"
              className="text-black w-full rounded-sm bg-gray-400 border p-2 text-xs outline-none placeholder:text-gray-700"
            />
            <button
              onClick={handleSubmit}
              type="submit"
              className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4">
              Отправить
            </button>
          </form>

          {cms?.map((comment) => (
            <CommentItem key={comment.createdAt} comment={comment}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
