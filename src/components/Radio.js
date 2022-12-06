import React, { useContext, useState } from "react";

import MainContext from "../context/MainContext";



function SexRadio() {
  const [gender, setGender] = useState("");

  const { verifyResult, SetSex } = useContext(MainContext)

  function onChangeValue(event) {
    setGender(event.target.value);

    if (event.target.value === 'Male') {
      SetSex('Male')
    }
    if (event.target.value === 'Female') {
      SetSex('Female')
    }

  }



  return (
    <div className={`radiobox ${verifyResult === 'badSex' ? 'invalid' : ''}`} onChange={onChangeValue}> Sex:
      <input style={{ width: '15px' }} type="radio" value="Male" name="sex" checked={gender === "Male"} onChange={onChangeValue} /> Male
      <input style={{ width: '15px' }} type="radio" value="Female" name="sex" checked={gender === "Female"} onChange={onChangeValue} /> Female

    </div>

  );
}

export default SexRadio;