import React, { useContext } from 'react';
import Likes from '../components/Likes';
import Message from '../components/Message';
import Nav from '../components/Navigate';
import MainContext from "../context/MainContext";

const LikesPage = () => {
  const { showMessage } = useContext(MainContext)
  return (
    <div className="p50">
      <Nav />
      <Likes />
      {showMessage && <Message />}
    </div>
  );
};

export default LikesPage;