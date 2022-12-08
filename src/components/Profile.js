import { setMaxListeners } from 'events';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainContext from "../context/MainContext";

import { checksesssion, post, timeDistance } from "../plugins/http";
import Filters from './Filters';




const Profile = () => {


  // const [image, setImage] = useState('first')
  const imageRef = useRef()
  // const imagetwoRef = useRef()
  // const sexRef = useRef()
  // const ageRef = useRef()
  // const hairRef = useRef()
  const nav = useNavigate()
  const { sessionUser, userImages, userImage, setuserImages, setSessionUser, filter, imgI, setImgI, setList, setListIndex, setNobodyAvailable } = useContext(MainContext)


  const updateProfile = async () => {
    const data = {
      // name: sessionUser.name,
      image: imageRef.current.value,
      // imagetwo: imagetwoRef.current.value,
    }
    const res = await post('updateprofile', data)
    if (res.error === true) return nav('/login')
    // setSessionUser(res.data)
    setuserImages(res.data.images)
    // setuserImageTwo(res.data.imagetwo)
    console.log(res)
    imageRef.current.value = ''

  }
  const getList = async () => {
    setListIndex(0)
    const data = {
      sex: filter.sex,
      city: filter.city,
      minAge: filter.minAge,
      maxAge: filter.maxAge,
      name: sessionUser.name,
    }
    // console.log(data)
    const res = await post('getList', data)
    console.log('getList res', res.data)
    setList(res.data)
    if (res.data.length > 0) {
      setNobodyAvailable(false)
    } else {
      setNobodyAvailable(true)
    }
    nav('/swipe')
  }


  const changeImage = () => {
    console.log(userImages.length)
    if (imgI < userImages.length - 1) {
      setImgI(imgI + 1)
    } else {
      setImgI(0)
    }
  }

  return (
    <div>

      <button style={{ width: '630px' }} onClick={() => nav('/')}>Back</button>
      <div className=' d-flex f-wrap  a-center'>

        <div className='profile-card d-flex f-wrap f-column a-center ' >
          <h5>Your profile</h5>
          <div className='image-container d-flex f-wrap f-end' style={{ backgroundImage: `url("${userImages.length === 0 ? userImage : userImages[imgI]}")` }}>
            <h3 style={{ color: 'white' }}>{sessionUser.name} {sessionUser.age}, from {sessionUser.city}</h3>

          </div>
          <button onClick={changeImage}> {'<-->'} </button>

          {userImages.length > 1 && <button onClick={getList} className='large' >Find friends</button>}


        </div>
        <div className='profile-card d-flex f-wrap f-column a-center ' >
          <h5>Add photo:</h5>

          <input className='m10' type={'text'} ref={imageRef} placeholder={'Enter your photo'} />

          <button onClick={updateProfile}>Add</button>

          <div>
            <Filters />

          </div>
        </div>
      </div>
    </div>
  );
};

// default: "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg"

export default Profile;