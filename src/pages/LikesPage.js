import React from 'react';
import Likes from '../components/Likes';
import Nav from '../components/Navigate';


const LikesPage = () => {
  return (
    <div className="p50">
      <Nav />
      <Likes />
    </div>
  );
};

export default LikesPage;