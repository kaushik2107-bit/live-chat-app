import "./index.css";
import MainPage from "./components/MainPage"
import Login from "./components/Login"
import { useEffect, useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import axios from "axios"

function App() {
  const [user, setUser] = useState(null);
  const REACT_APP_API_URL = "https://live-socket-chat-app.herokuapp.com"

  const getUser = async () => {
    try {
      const url = `${REACT_APP_API_URL}/auth/login/success`
      const { data } = await axios.get(url, { crossDomain: true, withCredentials: true })
      setUser(data.user._json)
      sessionStorage.setItem("name", data.user._json.name)
      sessionStorage.setItem("email", data.user._json.email)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUser();
  }, [])

  return (
    <div className="w-[100vw] h-[100vh] bg-[#202029] overflow-hidden">
      <Routes>
        <Route exact path="/" element={user ? <Navigate to="/chat" /> : <Navigate to="/login" /> } />
        <Route exact path="/login" element={user ? <Navigate to="/chat" /> : <Login /> } />
        <Route path="/chat" element={user ? <MainPage userInfo={user}/> : <Navigate to="/" /> } />
      </Routes>
    </div>
  )
}

export default App;
