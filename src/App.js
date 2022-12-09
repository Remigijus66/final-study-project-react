import './App.css';
import io from "socket.io-client"
import { useEffect, useState } from "react";
import MainContext from "./context/MainContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import UserProfilePage from './pages/UserProfilePage';
import IndexPage from './pages/IndexPage';
import RegisterPage from './pages/RegisterPage';
import SwipePage from './pages/SwipePage';
import LikesPage from './pages/LikesPage';
import { post } from './plugins/http';


const socket = io.connect('http://localhost:4001');


function App() {
    // const nav = useNavigate()
    const [sex, SetSex] = useState('')
    const [verifyResult, setVerifyResult] = useState('')
    const [city, setCity] = useState("City");
    const [nobodyAvailable, setNobodyAvailable] = useState(false);
    const [sessionUser, setSessionUser] = useState({})
    const [userImages, setuserImages] = useState([])
    const [imgI, setImgI] = useState(0)
    const [userImage, setuserImage] = useState("https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg")
    const [filter, setFilter] = useState({})
    const [list, setList,] = useState([])
    const [listIndex, setListIndex] = useState(0)
    const [onesWholikedMe, setOnesWhoLikedMe] = useState([])
    const [onesWhoILiked, setOnesWhoILiked] = useState([])
    const [onlineUsers, setOnlineUsers,] = useState([])


    const likedMe = async (name) => {
        const data = {
            // name: sessionUser.name
            name: name
        }
        console.log('looking for my likers', data)
        const res = await post('likedMe', data)
        if (res.error === true) return prompt('please login')
        setOnesWhoLikedMe(res.data)
    }
    const iLiked = async () => {
        const data = {
            name: sessionUser.name
        }
        const res = await post('iLiked', data)
        if (res.error === true) return prompt('please login')
        setOnesWhoILiked(res.data)
    }



    const states = {
        socket,
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
        onesWholikedMe, setOnesWhoLikedMe,
        onesWhoILiked, setOnesWhoILiked,
        iLiked, likedMe,
        onlineUsers, setOnlineUsers,

    }

    useEffect(() => {


        socket.on('log', (data) => {
            setOnlineUsers(data)
            console.log('log socket', data)
        })

        socket.on('like', (data) => {

            console.log('like socket to', data.to)
            likedMe(data.to)
            // prompt('You have got like from ', data)
        })

    }, [])


    return (
        <div >


            <MainContext.Provider value={states}>

                <BrowserRouter>

                    <Routes>
                        <Route path="/login" element={<LoginPage />} />

                        <Route path="/register" element={<RegisterPage />} />

                        <Route path="/" element={<IndexPage />} />

                        <Route path="/swipe" element={<SwipePage />} />

                        <Route path="/profile" element={<UserProfilePage />} />

                        <Route path="/likes" element={<LikesPage />} />

                    </Routes>

                </BrowserRouter>


            </MainContext.Provider>

        </div>
    );
}

export default App;
