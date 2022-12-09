
import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MainContext from "../context/MainContext";

import { post } from "../plugins/http";
import Filters from './Filters';




const Profile = () => {

  const imageRef = useRef()
  const nav = useNavigate()
  const { sessionUser, userImages, userImage, setuserImages, filter, imgI, setImgI, setList, setListIndex, setNobodyAvailable } = useContext(MainContext)


  const updateProfile = async () => {
    const data = {
      image: imageRef.current.value,
    }
    const res = await post('updateprofile', data)
    if (res.error === true) return nav('/login')
    setuserImages(res.data.images)
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

    const res = await post('getList', data)
    if (res.error === true) return nav('/')
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


export default Profile;