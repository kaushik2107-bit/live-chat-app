import React, { useState, useEffect } from "react"
import jwt_decode from "jwt-decode"

export default function Login() {
	const REACT_APP_API_URL = "https://live-socket-chat-app.herokuapp.com"
	const googleAuth = () => {
		window.open(`${REACT_APP_API_URL}/auth/google/callback`, "_self")
	}

	function handleCallbackResponse(res) {
		console.log(res.credential)
		var userObj = jwt_decode(res.credential)
		console.log(userObj)
	}

	useEffect(() => {
		google.accounts.id.initialize({
			client_id: "965373897090-ddtpj3n4ra8ptdtso20953hit3fhnal4.apps.googleusercontent.com",
			callback: handleCallbackResponse
		})
		google.accounts.id.renderButton(
			document.getElementById("signInDiv"),
			{ theme: "outline", size: "large" }
		)
	}, [])

	return (
		<div id="signInDiv"></div>
	)

	// return (
	// 	<div className="flex w-[252px] h-[58px] bg-blue-600 items-center rounded-lg m-auto mt-[45vh] cursor-pointer" onClick={googleAuth}>
	// 		<div 
	// 			style={{background: "url(https://play-lh.googleusercontent.com/6UgEjh8Xuts4nwdWzTnWH8QtLuHqRMUB7dp24JYVE2xcYzq4HA8hFfcAbU-R-PC_9uA1)", backgroundSize: "cover", backgroundPosition: "center"}} 
	// 			className="w-[50px] h-[50px] m-1 rounded-lg" 
	// 		/>
	// 		<div className="w-[200px] h-[50px] bg-blue-600 m-1 flex items-center justify-center text-white font-semibold rounded-lg">
	// 			Sign Up With Google
	// 		</div>
	// 	</div>
	// )
}