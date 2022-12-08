import React, { useContext, useState, useRef } from 'react';

import ReactDOM from 'react-dom';
import MainContext from "../context/MainContext";
import { useNavigate } from "react-router-dom";
import { post } from "../plugins/http";
import SexRadio from './Radio';
import "react-widgets/styles.css";
import DropdownList from "react-widgets/DropdownList"
import InputRange from 'react-input-range';

const Filters = () => {
  const nav = useNavigate()

  // const [errorMessage, setErrorMessage] = useState('')
  // const [successMessage, setSuccessMessage] = useState('')

  const { setSessionUser, setuserImage, socket, sessionUser, verifyResult, setVerifyResult, city, setCity, sex, SetSex, filter, setFilter } = useContext(MainContext)



  // const registerNameRef = useRef()
  // const passOneRef = useRef()
  // const passTwoRef = useRef()
  const minAgeRef = useRef()
  const maxAgeRef = useRef()


  const cities = ['Vilnius', 'Kaunas', 'Klaipėda', 'Šiauliai', 'Panevėžys', 'Alytus', 'Marijampolė', 'Mažeikiai', 'Jonava', 'Utena', 'Kėdainiai', 'Tauragė', 'Telšiai', 'Ukmergė'
  ]


  // const registerUser = async () => {
  //   setErrorMessage('')
  //   // setSuccessMessage('')
  //   console.log(registerNameRef.current.value)
  //   console.log(passOneRef.current.value)
  //   console.log(passTwoRef.current.value)
  //   console.log(ageRef.current.value)
  //   const data = {
  //     name: registerNameRef.current.value,
  //     passOne: passOneRef.current.value,
  //     passTwo: passTwoRef.current.value,
  //     sex: sex,
  //     age: ageRef.current.value,
  //     city: city
  //   }
  //   const res = await post('register', data)
  //   console.log('res', res)
  //   setVerifyResult('')
  //   if (res.error === true) setErrorMessage(res.message)
  //   if (res.data === "badPass" || res.data === 'badName' || 'badSex' || 'badAge' || 'badCity')
  //     setVerifyResult(res.data);
  //   if (res.error === false) {


  //     setSessionUser(res.data)
  //     registerNameRef.current.value = ''
  //     passOneRef.current.value = ''
  //     passTwoRef.current.value = ''
  //     ageRef.current.value = ''
  //     setCity('City')
  //     SetSex('')
  //     setSuccessMessage('Registration succesfull')
  //     setTimeout(() => {
  //       nav('/login')
  //       clearTimeout();
  //     }, 2000)
  //     // setSuccessMessage('')
  //   }

  // }

  const setFilterValue = () => {
    const filtervalue = {
      minAge: minAgeRef.current.value,
      maxAge: maxAgeRef.current.value,
      sex: sex,
      city: city,
    }
    setFilter(filtervalue)
    console.log('filter ===', filter);
    console.log('minAgeRef.current.value, ===', minAgeRef.current.value);
    console.log('maxAgeRef.current.value ===', maxAgeRef.current.value);
    console.log('sex ===', sex);
    console.log('city ===', city);
  }

  return (
    <div className='d-flex f-column a-center' >

      <h5>Looking for:</h5>



      <div className='filterbox'>

        <SexRadio />
        <label>Ages from

          <input style={{ width: '125px' }} min={'18'} max={'100'} type={"number"} ref={minAgeRef} placeholder={'Age'} />
        </label>
        <label> Ages to
          <input style={{ width: '145px' }} min={'18'} max={'100'} type={"number"} ref={maxAgeRef} placeholder={'Age'} />
        </label>

        <div>
          <DropdownList style={{ width: '230px' }}
            defaultValue="City"
            city={city}
            onChange={(nextCity) => setCity(nextCity)}
            data={cities}
          />


        </div>
        <button onClick={setFilterValue}>Set filters </button></div>


    </div>
  );
};

export default Filters;