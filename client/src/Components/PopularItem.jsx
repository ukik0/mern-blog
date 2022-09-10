import React from 'react';
import { Link } from 'react-router-dom';

const PopularItem = ({ post }) => {
  return (
    <div className="bg-gray-600 my-1">
      <div className="flex text-xs p-2 text-gray-300 hover:bg-gray-600 hover:text-white line-clamp-1">
        <Link to={`/post/${post._id}`}>
          <span>{post.title}</span>
        </Link>
      </div>
    </div>
  );
};

export default PopularItem;
