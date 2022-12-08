import React, { useContext } from 'react';
import { useEffect } from 'react';
import MainContext from "../context/MainContext";
import { post } from '../plugins/http';

const Card = ({ name, age, city, images, id }) => {


  const { socket, sessionUser, userImage, imgI, setImgI, list, listIndex, setListIndex, setNobodyAvailable } = useContext(MainContext)


  const changeImage = () => {
    console.log(images.length)
    if (imgI < images.length - 1) {
      setImgI(imgI + 1)
    } else {
      setImgI(0)
    }
  }
  const next = () => {
    if (listIndex < list.length - 1) {
      setListIndex(listIndex + 1)
    } else {
      setListIndex(0)
      setNobodyAvailable(true)
    }
  }
  const like = async () => {
    console.log('like')
    console.log('sessionUser ===', sessionUser.name);
    console.log('id ===', name);
    const data = {
      author: sessionUser.name,
      liked: name
    }
    const res = await post('addLike', data)
    console.log(res)
    if (res.error === false) {
      socket.emit('like', name)
      next()
    }
  }
  const dislike = () => {
    console.log('dislike')
    next()
    console.log(list)
  }
  const sendSocket = () => {
    const data = { from: sessionUser.name, to: 'jo' }
    socket.emit('like', data)
    // prompt('kuku')
  }
  return (


    <div className='profile-card d-flex f-wrap f-column a-center j-center' >
      <h5>{name}</h5>
      <button onClick={sendSocket}>send socket</button>
      <div className='image-container d-flex f-wrap f-end' style={{ backgroundImage: `url("${images.length === 0 ? userImage : images[imgI]}")` }}>
        <h3 style={{ color: 'white' }}>{name} {age}, from {city}</h3>

      </div>
      <button onClick={changeImage}> {'<-->'} </button>

      <div >
        <button onClick={dislike} style={{ width: '100px', margin: '20px' }}> Dislike </button>
        <button onClick={like} style={{ width: '100px', margin: '20px' }}> Like</button>
      </div>
    </div>



  );
};


export default Card;
//const MainGrid = ({cells, selected, setSelected}) => {

//



