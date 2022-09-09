import React from 'react';
import Moment from 'react-moment';

import { AiFillEye, AiOutlineMessage } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const PostItem = ({ post }) => {
  if (!post) {
    return <div className="text-xl text-center text-white py-10">Постов нет</div>;
  }

  return (
    <div className="flex flex-col basis-1/4 flex-grow">
      <Link to={`/post/${post._id}`} className={post.imageUrl ? 'flex rounded-sm h-80' : 'flex rounded-sm'}>
        {post.imageUrl && <img src={`http://localhost:3002/${post.imageUrl}`} alt='img' className='object-cover w-full'/>}
      </Link>
      <div className="flex justify-between items-center pt-2">
        <div className="text-xs text-white opacity-50">{post.username}</div>
        <div className="text-xs text-white opacity-50">
          <Moment date={post.createAt} format="D MMM YYYY" />
        </div>
      </div>

      <Link to={`/post/${post._id}`} className="text-white text-xl">{post.title}</Link>
      <p className="text-white opacity-60 text-xs pt-4">{post.text}</p>

      <div className="flex gap-3 mt-2 items-center">
        <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
          <AiFillEye />
          <span>{post.views}</span>
        </button>
        <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
          <AiOutlineMessage />
          <span>{post.comments?.length || 0}</span>
        </button>
      </div>
    </div>
  );
};

export default PostItem;
