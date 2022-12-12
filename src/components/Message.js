import React, { useContext, useRef, useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import MainContext from "../context/MainContext";
import { post } from '../plugins/http';

const Message = () => {
  const nav = useNavigate()
  const { sessionUser, messageTo, setShowMessage, chatMessages, setChatMessages, onlineUsers, socket, reloadMessages, setReloadMessages, setNewMessages, newMessages } = useContext(MainContext)
  const [userOnline, setUserOnline] = useState('false')
  const messageTextRef = useRef()

  useEffect(() => {
    getMessages()
  }, []);

  useEffect(() => {
    onlineUsers.some(e => e.name === messageTo) ? setUserOnline(true) : setUserOnline(false)
  }, [onlineUsers]);

  useEffect(() => {
    getMessages()
    setReloadMessages(false)
    setNewMessages('')
  }, [reloadMessages, newMessages]);


  const close = () => {
    setShowMessage(false)
  }

  const sendMessage = async () => {

    const data = {
      from: sessionUser.name,
      to: messageTo,
      text: messageTextRef.current.value
    }
    const res = await post('sendMessage', data)
    if (res.error === true) return nav('/')
    if (res.error === false) {
      messageTextRef.current.value = ''
      const socketData = { to: messageTo, from: sessionUser.name }
      socket.emit('message', socketData)

    }
  }

  const getMessages = async () => {
    const data = {
      from: sessionUser.name,
      to: messageTo,
    }
    const res = await post('getMessages', data)
    if (res.error === true) return nav('/')
    if (res.error === false) {
      messageTextRef.current.value = ''
      console.log('messages', res.data)
      const messages = res.data
      setChatMessages(messages.reverse())
    }

  }


  return (


    <div className="chat-container d-flex j-center a-center" >
      <div className='popbox '>
        <div className='d-flex f-wrap' style={{ cursor: 'pointer', border: '1px solid black', padding: '1px' }} onClick={close}>
          <div className='d-flex j-center a-center light-gray grow1' > <h5>Chat with {messageTo} </h5> {userOnline && <div className='dot'></div>} </div>
          <div style={{ cursor: 'pointer', border: '1px solid black', padding: '5px' }}>X</div>
        </div>
        <div className='messages-container'>
          {chatMessages.map((x, i) => <div key={i}>
            <h5>{x.from} :</h5>
            <p style={{ marginTop: '0px' }}>{x.text}</p>
          </div>)}
        </div>
        <h5>Enter your message here</h5>
        <input style={{ width: '400px' }} type="text" ref={messageTextRef} />
        <button onClick={sendMessage}>Send</button>

      </div>
    </div>






  );
};


export default Message;
