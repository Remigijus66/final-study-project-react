import React, { useContext, useState, useRef } from 'react';


import MainContext from "../context/MainContext";
import { useNavigate } from "react-router-dom";
import { post } from "../plugins/http";
import SexRadio from './Radio';
import "react-widgets/styles.css";
import DropdownList from "react-widgets/DropdownList"


const Filters = () => {
  const nav = useNavigate()

  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const { setSessionUser, setuserImage, socket, sessionUser, verifyResult, setVerifyResult, city, setCity, sex, SetSex } = useContext(MainContext)



  const registerNameRef = useRef()
  const passOneRef = useRef()
  const passTwoRef = useRef()
  const ageRef = useRef()


  const cities = ['Vilnius', 'Kaunas', 'Klaipėda', 'Šiauliai', 'Panevėžys', 'Alytus', 'Marijampolė', 'Mažeikiai', 'Jonava', 'Utena', 'Kėdainiai', 'Tauragė', 'Telšiai', 'Ukmergė'
  ]


  const registerUser = async () => {
    setErrorMessage('')
    // setSuccessMessage('')
    console.log(registerNameRef.current.value)
    console.log(passOneRef.current.value)
    console.log(passTwoRef.current.value)
    console.log(ageRef.current.value)
    const data = {
      name: registerNameRef.current.value,
      passOne: passOneRef.current.value,
      passTwo: passTwoRef.current.value,
      sex: sex,
      age: ageRef.current.value,
      city: city
    }
    const res = await post('register', data)
    console.log('res', res)
    setVerifyResult('')
    if (res.error === true) setErrorMessage(res.message)
    if (res.data === "badPass" || res.data === 'badName' || 'badSex' || 'badAge' || 'badCity')
      setVerifyResult(res.data);
    if (res.error === false) {


      setSessionUser(res.data)
      registerNameRef.current.value = ''
      passOneRef.current.value = ''
      passTwoRef.current.value = ''
      ageRef.current.value = ''
      setCity('City')
      SetSex('')
      setSuccessMessage('Registration succesfull')
      setTimeout(() => {
        nav('/login')
        clearTimeout();
      }, 2000)
      // setSuccessMessage('')
    }

  }



  return (
    <div className='d-flex f-column a-center' >

      <h5>Looking for:</h5>



      <div className='filterbox'>

        <SexRadio />
        <label>Ages from

          <input style={{ width: '125px' }} className={`${verifyResult === 'badAge' ? 'invalid' : ''}`} min={'18'} max={'100'} type={"number"} ref={ageRef} placeholder={'Age'} />
        </label>
        <label> Ages to
          <input style={{ width: '145px' }} className={`${verifyResult === 'badAge' ? 'invalid' : ''}`} min={'18'} max={'100'} type={"number"} ref={ageRef} placeholder={'Age'} />
        </label>

        <div className={`${verifyResult === 'badCity' ? 'invalid' : ''}`}>
          <DropdownList style={{ width: '230px' }}
            defaultValue="City"
            city={city}
            onChange={(nextCity) => setCity(nextCity)}
            data={cities}
          />
        </div>
        <button onClick={registerUser}>Register </button></div>
      <p style={{ color: 'red' }}>{errorMessage}</p>
      <p style={{ color: 'green' }}>{successMessage}</p>

    </div>
  );
};

export default Filters;