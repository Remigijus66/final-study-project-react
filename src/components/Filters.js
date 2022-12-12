import React, { useContext, useRef } from 'react';
import MainContext from "../context/MainContext";

import SexRadio from './Radio';
import "react-widgets/styles.css";
import DropdownList from "react-widgets/DropdownList"


const Filters = () => {

  const { city, setCity, sex, filter, setFilter } = useContext(MainContext)

  const minAgeRef = useRef()
  const maxAgeRef = useRef()

  const cities = ['Vilnius', 'Kaunas', 'Klaipėda', 'Šiauliai', 'Raseiniai', 'Panevėžys', 'Alytus', 'Marijampolė', 'Mažeikiai', 'Jonava', 'Utena', 'Kėdainiai', 'Tauragė', 'Telšiai', 'Ukmergė'
  ]


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
        <button style={{ width: '95%' }} onClick={setFilterValue}>Set filters </button></div>


    </div>
  );
};

export default Filters;