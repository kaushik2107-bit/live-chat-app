import React from "react"

export default function Login() {
	const REACT_APP_API_URL = "https://live-socket-chat-app.herokuapp.com"
	const googleAuth = () => {
		window.open(`${REACT_APP_API_URL}/auth/google/callback`, "_self")
	}
	return (
		<div className="flex w-[252px] h-[58px] bg-blue-600 items-center rounded-lg m-auto mt-[45vh] cursor-pointer" onClick={googleAuth}>
			<div 
				style={{background: "url(https://play-lh.googleusercontent.com/6UgEjh8Xuts4nwdWzTnWH8QtLuHqRMUB7dp24JYVE2xcYzq4HA8hFfcAbU-R-PC_9uA1)", backgroundSize: "cover", backgroundPosition: "center"}} 
				className="w-[50px] h-[50px] m-1 rounded-lg" 
			/>
			<div className="w-[200px] h-[50px] bg-blue-600 m-1 flex items-center justify-center text-white font-semibold rounded-lg">
				Sign Up With Google
			</div>
		</div>
	)
}