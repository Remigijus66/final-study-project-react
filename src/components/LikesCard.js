import React, { useContext, useState } from 'react';
import MainContext from "../context/MainContext";

const LikesCard = ({ name, age, city, images, }) => {
  const [imgI, setImgI] = useState(0)

  const { userImage, sessionUser, setMessageTo, setShowMessage } = useContext(MainContext)


  const changeImage = () => {
    console.log(images.length)
    if (imgI < images.length - 1) {
      setImgI(imgI + 1)
    } else {
      setImgI(0)
    }
  }
  const chat = () => {
    console.log(sessionUser.name, 'sending message to', name)
    setShowMessage(true)
    setMessageTo(name)
  }


  return (


    <div className='like-card d-flex f-wrap f-column a-center ' >
      <h5>{name}</h5>
      <div className='image-container d-flex f-wrap f-end' style={{ backgroundImage: `url("${images.length === 0 ? userImage : images[imgI]}")` }}>
        <h3 style={{ color: 'white' }}>{name} {age}, from {city}</h3>

      </div>
      <button onClick={changeImage}> {'<-->'} </button>
      <button style={{ width: '200px' }} onClick={chat}> Chat</button>

    </div>



  );
};


export default LikesCard;
