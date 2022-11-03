import React, { useState, useEffect } from "react"
import jwt_decode from "jwt-decode"

export default function Login() {
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")

	const handleChangeName = (e) => {
		setName(e.target.value)
	}

	const handleChangeEmail = (e) => {
		setEmail(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		localStorage.setItem("name", name)
		localStorage.setItem("email", email)
		window.open('https://live-chat-app-mern.netlify.app/chat', '_self')
	}

	return (
		<>
			<h2 className="text-center text-white text-2xl m-4 uppercase mt-[30vh]">Enter the Room</h2>
			<form className="flex justify-center items-center" onSubmit={handleSubmit}>
				<table className="">
					<tr className="">
					<td className="m-2 p-2 text-white"><label htmlFor="name">Name</label></td>
					<td className="m-2 p-2 "><input className="p-[6px] bg-[#373c66] rounded-md text-white" type="text" onChange={handleChangeName} value={name} placeholder="Your Name" /></td>
					</tr>

					<tr className="">
					<td className="m-2 p-2 text-white"><label htmlFor="email">Email</label></td>
					<td className="m-2 p-2 "><input className="p-[6px] bg-[#373c66] rounded-md text-white" type="email" onChange={handleChangeEmail} value={email} placeholder="Your Email" /></td>
					</tr>

					<tr className="">
					<td className="m-2 p-2  text-center" colSpan={2}><input className="p-[6px] text-white bg-[#171c45] w-32 p-2 pl-4 pr-4 text-center rounded-md cursor-pointer" type="submit" value="Submit" /></td>
					</tr>
				</table>
			</form>
		</>
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