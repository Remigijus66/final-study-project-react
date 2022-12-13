import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainContext from "../context/MainContext";
import { post } from '../plugins/http';

import LikesCard from './LikesCard';

const Likes = () => {
  const nav = useNavigate()
  const { sessionUser, onesWholikedMe,
    onesWhoILiked, likedMe, iLiked, socket, newLikes, setNewLikes } = useContext(MainContext)

  useEffect(
    () => {
      likedMe(sessionUser.name)
      iLiked(sessionUser.name)
      setNewLikes('')

    }, []
  )
  useEffect(
    () => { setNewLikes('') }, [onesWholikedMe]
  )

  const dislike = async (likeHolder) => {
    console.log('who dislikes', sessionUser.name)
    console.log('who  is to be disliked', likeHolder)
    const data = {
      author: sessionUser.name,
      liked: likeHolder
    }
    const res = await post('deleteLike', data)
    if (res.error === true) return nav('/')
    if (res.error === false) {
      const socketData = {
        from: sessionUser.name,
        to: likeHolder
      }
      socket.emit('dislike', socketData)
      // console.log(res)
    }
  }

  return (
    <div className='d-flex '>
      <div className='grow1'>
        {/* <button onClick={likedMe}>Liked Me</button> */}
        <h3 style={{ marginLeft: '20px' }}>The ones who liked me ({onesWholikedMe.length}) </h3>
        <div className='d-flex f-wrap'>
          {onesWholikedMe.map((x, i) => <div key={i} ><LikesCard images={x.person[0].images} age={x.person[0].age} city={x.person[0].city} name={x.person[0].name} /></div>)}
        </div  >
      </div>
      <div className='dash'></div>
      <div className='grow1'>
        {/* <button onClick={iLiked}> I liked </button> */}
        <h3 style={{ marginLeft: '20px' }}>The ones I liked ({onesWhoILiked.length}) </h3>
        <div className='d-flex f-wrap' >
          {onesWhoILiked.map((x, i) => <div key={i} ><LikesCard images={x.person[0].images} age={x.person[0].age} city={x.person[0].city} name={x.person[0].name} /><button className='dislike' onClick={() => { dislike(x.person[0].name) }}>Dislike</button  > </div>)}
        </div>
      </div>

    </div>
  );
};


export default Likes;