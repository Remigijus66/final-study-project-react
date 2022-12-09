import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainContext from "../context/MainContext";

import { post, } from "../plugins/http";
import Card from './Card';
import Filters from './Filters';

const Swipe = () => {


  const [showFilters, setShowFilters] = useState(false)

  const nav = useNavigate()
  const { sessionUser, filter, list, listIndex, nobodyAvailable, setListIndex, setNobodyAvailable, setList } = useContext(MainContext)

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

  return (
    <div>

      {!showFilters && <button onClick={() => { setShowFilters(true) }}>Show filters</button>}
      {showFilters && <button onClick={() => { setShowFilters(false) }}>Hide filters</button>}

      <div className=' d-flex f-wrap  a-center j-center'>
        {!nobodyAvailable && <Card images={list[listIndex].images} age={list[listIndex].age} city={list[listIndex].city} name={list[listIndex].name} id={list[listIndex]._id} />}
        {nobodyAvailable && <div className='profile-card d-flex f-wrap f-column a-center j-center'> <h3> oops... nobody is in the list. </h3></div>}
        {showFilters && <div>

          <Filters />
          <button onClick={getList} className='filterbox'> Search</button>
        </div>}

      </div>
    </div>
  );
};


export default Swipe;