import React, { useContext, useState, useRef, useEffect } from 'react';

import MainContext from "../context/MainContext";
import { useNavigate } from "react-router-dom";
import { post } from "../plugins/http";


const Login = () => {
  const nav = useNavigate()
  const [verifyResult, setVerifyResult] = useState('')
  const [error, setError] = useState('')
  const [keepMeLogged, setKeepMeLogged] = useState(false)
  const [checked, setChecked] = useState(false);


  const { setSessionUser, userImages, setuserImages, setuserImage, socket, sessionUser } = useContext(MainContext)


  const loginNameRef = useRef()
  const loginPassRef = useRef()

  useEffect(
    () => {
      const autologin = async () => {
        if (localStorage.getItem('secret') === '') return
        const data = {
          secret: localStorage.getItem('secret')
        }
        const res = await post('autologin', data)
        console.log(res)
        if (res.error === true) setError(res.message)
        if (res.error === false) {
          socket.emit('login', res.data.name)
          setSessionUser(res.data)
          setuserImages(res.data.images)
          if (res.data.images.length > 0) setuserImage(res.data.images[0])
          // setuserImageTwo(res.data.imagetwo)
          nav('/profile')
        }
      }

      // console.log('appMemory: ', localStorage.getItem('keepMeLogged'))
      // autologin()
      // console.log('secret: ', localStorage.getItem('secret'))
      // // const autologin = localStorage.getItem('keepMeLogged')
      autologin()




    }, []
  )

  const loginUser = async () => {

    setError('')
    const data = {
      name: loginNameRef.current.value,
      pass: loginPassRef.current.value,
      autologin: localStorage.getItem('keepMeLogged')

    }
    console.log(data)
    const res = await post('login', data)
    console.log(res)
    if (res.error === false) {
      socket.emit('login', res.data.name)
      localStorage.setItem('secret', res.data.secret)
      setSessionUser(res.data)
      setuserImages(res.data.images)
      if (res.data.images.length > 0) setuserImage(res.data.images[0])
      nav('/profile')
      if (localStorage.getItem('keepMeLogged') === true) { console.log('write.secret') }
      //   loginNameRef.current.value = ''
      //   loginPassRef.current.value = ''
      //   socket.emit('login', res.data.name)
      //   nav('/')
      // }


    }
    if (res.error === true) setError(res.message)

  }

  const logoutUser = () => {
    localStorage.setItem('keepMeLogged', false)
    localStorage.setItem('token', '')

  }


  const handleChange = () => {
    setKeepMeLogged(!keepMeLogged);
    localStorage.setItem('keepMeLogged', !keepMeLogged)
    console.log('keepMeLogged', !keepMeLogged)

  }




  return (
    <div className='d-flex f-column a-center' >
      <h2> Ultimate online dating page  </h2>
      <h3>Login </h3>


      <div className='userbox'>

        <input type={'text'} ref={loginNameRef} placeholder={'Enter username'} />
        <input type={"password"} ref={loginPassRef} placeholder={'Enter password'} />
        <button onClick={loginUser}>Login </button>
        <button onClick={logoutUser}>Logout </button>
      </div>
      <label>

        <input onChange={handleChange} type="checkbox" checked={keepMeLogged} /> Keep me logged
      </label>
      <p style={{ color: 'red' }}>{error}</p>

      {/* <div className='userbox'>
        <input className={`${verifyResult === 'badName' ? 'invalid' : ''}`} type={'text'} ref={registerNameRef} placeholder={'Enter username'} />
        <input className={`${verifyResult === 'badPass' ? 'invalid' : ''}`} type={"password"} ref={registerPassOneRef} placeholder={'Enter password'} />
        <input className={`${verifyResult === 'badPass' ? 'invalid' : ''}`} type={"password"} ref={registerPassTwoRef} placeholder={'Repeat password'} />
        <button onClick={registerUser}>Register </button></div>
      <p style={{ color: 'red' }}>{error}</p> */}

    </div >
  );
};

export default Login;