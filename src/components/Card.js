import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainContext from "../context/MainContext";
import { post } from '../plugins/http';

const Card = ({ name, age, city, images, id }) => {

  const [imgI, setImgI] = useState(0)
  const nav = useNavigate()
  const { socket, sessionUser, userImage, list, setList, listIndex, setListIndex, setNobodyAvailable } = useContext(MainContext)


  const changeImage = () => {
    console.log(images.length)
    if (imgI < images.length - 1) {
      setImgI(imgI + 1)
    } else {
      setImgI(0)
    }
  }
  const next = () => {

    // console.log('next list', list)
    // console.log('next index before', listIndex)
    if (listIndex < list.length - 1) {
      setListIndex(listIndex + 1)
    } else {
      setListIndex(0)
      // setNobodyAvailable(true)
    }
    // console.log('next index after', listIndex)

  }
  const like = async () => {

    // console.log('list', list)
    const listCopy = list
    // console.log('listCopy', listCopy)
    // console.log('listindex', listIndex)
    listCopy.splice(listIndex, 1)
    console.log('listCopy', listCopy)
    if (listCopy.length === 0) setNobodyAvailable(true)
    setList(listCopy)

    // console.log('like')
    // console.log('sessionUser ===', sessionUser.name);
    // console.log('id ===', name);
    const data = {
      author: sessionUser.name,
      liked: name
    }
    const res = await post('addLike', data)
    console.log(res)
    if (res.error === true) return nav('/')
    if (res.error === false) {
      const socketData = {
        from: sessionUser.name,
        to: name
      }
      socket.emit('like', socketData)
      // console.log('socket emitted', socketData)
      next()
    }
  }
  const dislike = () => {
    console.log('dislike')
    next()
    console.log(list)
  }

  return (


    <div className='profile-card d-flex f-wrap f-column a-center j-center' >
      <h5>{name}</h5>
      <div className='image-container d-flex f-wrap f-end' style={{ backgroundImage: `url("${images.length === 0 ? userImage : images[imgI]}")` }}>
        <h3 style={{ color: 'white' }}>{name} {age}, from {city}</h3>

      </div>
      <button onClick={changeImage}> {'<-->'} </button>

      <div >
        <button onClick={dislike} style={{ width: '100px', margin: '20px' }}> Next </button>
        <button onClick={like} style={{ width: '100px', margin: '20px' }}> Like</button>
      </div>
    </div>



  );
};


export default Card;




