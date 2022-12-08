import './App.css';
import io from "socket.io-client"
import { useEffect, useState } from "react";
import MainContext from "./context/MainContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
// import UploadPage from './pages/UploadPage';
// import ListPage from './pages/ListPage';
// import WelcomePage from './pages/WecomePage';
// import PersonalMessagePage from './pages/PersonalMessagePage';
// import MessagePage from './pages/MessagePage';
// import LeaderboardPage from './pages/LeaderboardPage';
import UserProfilePage from './pages/UserProfilePage';
// import CreateDiscussionPage from './pages/CreateDiscussionPage';
// import DiscussionPage from './pages/DiscussionPage';
// import TopicPage from './pages/TopicPage';
import IndexPage from './pages/IndexPage';
import RegisterPage from './pages/RegisterPage';

import SliderPage from './pages/SliderPage';
import SwipePage from './pages/SwipePage';
import LikesPage from './pages/LikesPage';


const socket = io.connect('http://localhost:4001');


function App() {

    const [sex, SetSex] = useState('')
    const [verifyResult, setVerifyResult] = useState('')
    const [city, setCity] = useState("City");
    // const [title, setTitle] = useState('')
    // const [time, setTime] = useState(null)
    // const [price, setPrice] = useState(null)
    // const [auctions, setAuctions] = useState([])
    // const [showAuction, setShowAuction] = useState(false)
    // const [id, setId] = useState('')
    // const [singleAuction, setSingleAuction] = useState({})
    // const [tick, setTick] = useState(false)
    // const [showOpen, setShowOpen] = useState(true);
    // used in forum 
    const [nobodyAvailable, setNobodyAvailable] = useState(false);
    const [sessionUser, setSessionUser] = useState({})
    const [userImages, setuserImages] = useState([])
    const [imgI, setImgI] = useState(0)
    const [userImage, setuserImage] = useState("https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg")
    const [filter, setFilter] = useState({})
    const [list, setList,] = useState([])

    const [listIndex, setListIndex] = useState(0)
    // const [discussion, setDiscussion] = useState({})
    // const [discussionId, setDiscussionId] = useState('')
    // const [comments, setComments] = useState([])
    // const [replyComment, setReplyComment] = useState('')
    // const [users, setUsers] = useState([])
    const [onlineUsers, setOnlineUsers,] = useState([])
    // const [sender, setSender] = useState('')
    // const [reciever, setReciever] = useState('')



    const states = {
        // used in auctions
        // image, setImage,
        // title, setTitle,
        // time, setTime,
        // price, setPrice,
        // auctions, setAuctions,
        // showAuction, setShowAuction,
        // id, setId,
        // singleAuction, setSingleAuction,
        socket,
        // showOpen, setShowOpen,
        // showClosed, setShowClosed,
        // used in forum 
        city, setCity,
        sessionUser, setSessionUser,
        userImage, setuserImage,
        userImages, setuserImages,
        imgI, setImgI,
        sex, SetSex,
        verifyResult, setVerifyResult,
        filter, setFilter,
        list, setList,
        listIndex, setListIndex,
        nobodyAvailable, setNobodyAvailable,


        // topic, setTopic,
        // discussions, setDiscussions,
        // discussionId, setDiscussionId,
        // discussion, setDiscussion,
        // comments, setComments,
        // replyComment, setReplyComment,
        // users, setUsers,
        onlineUsers, setOnlineUsers,
        // sender, setSender,
        // reciever, setReciever
    }

    useEffect(() => {


        socket.on('log', (data) => {
            setOnlineUsers(data)
            console.log('log socket', data)
        })

        socket.on('like', (data) => {
            setOnlineUsers(data)
            prompt('You have got like from ', data)
            // console.log('log socket', data)
        })



    }, [])


    return (
        <div >

            {/* <h1 className="text-3xl font-bold underline p-9">
                Hello world!
            </h1> */}
            <MainContext.Provider value={states}>



                <BrowserRouter>


                    <Routes>
                        <Route path="/login" element={<LoginPage />} />

                        <Route path="/register" element={<RegisterPage />} />

                        <Route path="/" element={<IndexPage />} />

                        {/* <Route path="/slider" element={<SliderPage />} /> */}

                        <Route path="/swipe" element={<SwipePage />} />

                        {/* <Route path="/discussion" element={<DiscussionPage />} /> */}

                        {/* <Route path="/createDiscussion" element={<CreateDiscussionPage />} /> */}

                        <Route path="/profile" element={<UserProfilePage />} />

                        <Route path="/likes" element={<LikesPage />} />

                        {/* <Route path="/message" element={<MessagePage />} /> */}

                        {/* <Route path="/pm" element={<PersonalMessagePage />} /> */}




                    </Routes>

                </BrowserRouter>


            </MainContext.Provider>

        </div>
    );
}

export default App;
