import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import MainContext from "../context/MainContext";
import { post } from "../plugins/http";


const Nav = () => {
  const { sessionUser, setSessionUser, userImage, setuserImage, socket } = useContext(MainContext)
  const nav = useNavigate()
  const gearIcon = <FontAwesomeIcon icon={faGear} />

  const logout = async () => {
    const data = { name: sessionUser.name }
    const res = await post('logout', data)
    console.log(res.message)
    if (res.message === 'session terminated') {
      setSessionUser({});
      localStorage.setItem('secret', '')

      setuserImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFUUgRMfIreBNH7C7UXCnE7Uk_vm_PR0jEgaAQxCGbNBD0rojxzh6QggsPF9Jk9v_ozYM&usqp=CAU")
    }
    socket.emit('logout', sessionUser.name)
    nav('/login')

  }

  return (
    <div>

      <div className='navline d-flex a-center' >
        <div className='grow1'>
          <button onClick={() => { nav('/likes') }}> My likes</button>

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
