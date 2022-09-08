import React, { useEffect, useState } from 'react';

import PopularItem from '../Components/PopularItem';
import PostItem from '../Components/PostItem';

import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../redux/slices/post';

const Main = () => {
  const dispatch = useDispatch()
  const {posts, popularPosts} = useSelector((state) => state.posts)
  
  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  
  return (
    <div className="max-w-[900px] mx-auto py-10">
      <div className="flex justify-between gap-8">
        <div className="flex flex-col gap-10 basis-4/5 ">
         {posts.map((post, idx) => (
           <PostItem post={post} key={idx}/>
         ))}
        </div>
        <div className="basis-1/5">
          <div className="flex-xs uppercase text-white">
            {popularPosts.map((post, idx) => (
              <PopularItem key={idx}/>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Main;
