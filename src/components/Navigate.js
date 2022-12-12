import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import MainContext from "../context/MainContext";
import { post } from "../plugins/http";


const Nav = () => {
  const { sessionUser, setSessionUser, userImage, setuserImage, socket, newMessages } = useContext(MainContext)
  const nav = useNavigate()
  const gearIcon = <FontAwesomeIcon icon={faGear} />

  const logout = async () => {
    const data = { name: sessionUser.name }
    const res = await post('logout', data)
    console.log(res.message)
    if (res.message === 'session terminated') {
      setSessionUser({});
      localStorage.setItem('secret', '')

      setuserImage("https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg")
    }
    socket.emit('logout', sessionUser.name)
    nav('/login')

  }

  return (
    <div>

      <div className='navline d-flex a-center' >
        <div className='grow1'>
          <button onClick={() => { nav('/likes') }}> My likes</button>
          {newMessages && <h5 style={{ color: 'red' }}>You have message form -  {newMessages}</h5>}

        </div>

        <div className='d-flex f-wrap a-center' >
          <h4 style={{ margin: '7px' }}>{sessionUser.name}</h4>
          <div className='avatar' style={{ backgroundImage: `url("${userImage}")` }}></div>
          {sessionUser.name && <div style={{
            fontSize: '40px',
            margin: '10px', cursor: 'pointer'
          }} onClick={() => nav('/profile')}> {gearIcon} </div>}

          {sessionUser.name && <button onClick={logout}>Logout </button>}
        </div>
      </div >

    </div>
  );
};

export default Nav;
