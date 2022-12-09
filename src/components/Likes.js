import React, { useContext, useEffect } from 'react';
import MainContext from "../context/MainContext";

import LikesCard from './LikesCard';

const Likes = () => {

  const { sessionUser, onesWholikedMe,
    onesWhoILiked, likedMe, iLiked } = useContext(MainContext)

  useEffect(
    () => {
      likedMe(sessionUser.name)
      iLiked()

    }, []
  )




  return (
    <div className='d-flex '>
      <div className='grow1'>
        {/* <button onClick={likedMe}>Liked Me</button> */}
        <h3 style={{ marginLeft: '20px' }}>The ones who liked me</h3>
        <div className='d-flex f-wrap'>
          {onesWholikedMe.map((x, i) => <div key={i} ><LikesCard images={x.person[0].images} age={x.person[0].age} city={x.person[0].city} name={x.person[0].name} /></div>)}
        </div  >
      </div>
      <div className='dash'></div>
      <div className='grow1'>
        {/* <button onClick={iLiked}> I liked </button> */}
        <h3 style={{ marginLeft: '20px' }}>The ones I liked</h3>
        <div className='d-flex f-wrap' >
          {onesWhoILiked.map((x, i) => <div key={i} ><LikesCard images={x.person[0].images} age={x.person[0].age} city={x.person[0].city} name={x.person[0].name} /></div>)}
        </div>
      </div>

    </div>
  );
};


export default Likes;