import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainContext from "../context/MainContext";

import { post, } from "../plugins/http";
import Card from './Card';
import Filters from './Filters';

const Swipe = () => {


  const [showFilters, setShowFilters] = useState(false)
  const imageRef = useRef()

  const nav = useNavigate()
  const { sessionUser, userImages, userImage, setuserImages, setSessionUser, imgI, setImgI, list, listIndex, nobodyAvailable } = useContext(MainContext)


  return (
    <div>

      {!showFilters && <button onClick={() => { setShowFilters(true) }}>Show filters</button>}
      {showFilters && <button onClick={() => { setShowFilters(false) }}>Hide filters</button>}
      <button onClick={() => nav('/likes')}>Show my likes</button>

      <div className=' d-flex f-wrap  a-center j-center'>
        {!nobodyAvailable && <Card images={list[listIndex].images} age={list[listIndex].age} city={list[listIndex].city} name={list[listIndex].name} id={list[listIndex]._id} />}
        {nobodyAvailable && <div className='profile-card d-flex f-wrap f-column a-center j-center'> <h3> oops... nobody is in the list. </h3></div>}

        {showFilters && <Filters />}

      </div>
    </div>
  );
};


export default Swipe;