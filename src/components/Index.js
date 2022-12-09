import React from 'react';
import { useNavigate } from "react-router-dom";

const Index = () => {
  const nav = useNavigate()

  return (
    <div className='d-flex f-column a-center' >
      <h2> Ultimate online dating page  </h2>
      <button style={{ width: '100px' }} onClick={() => { nav('/register') }}>Register </button>
      <button style={{ width: '100px' }} onClick={() => { nav('/login') }}>Login </button>

    </div>
  );
};

export default Index;