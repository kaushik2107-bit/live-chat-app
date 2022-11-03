import React, { useState, useEffect, useRef, useCallback } from "react"
import { io } from "socket.io-client"
import axios from "axios"
import useInfiniteScrolling from "./useInfiniteScrolling"

const socket = io("https://live-socket-chat-app.herokuapp.com/")
socket.on("connect", () => {
	// console.log(`You connected with id ${socket.id}`)
})
socket.on("disconnect", () => {
	// console.log(`You disconnected with id ${socket.id}`)
})

export default function MainPage({ userInfo }) {
	const REACT_APP_API_URL = "https://live-socket-chat-app.herokuapp.com"
	const name = localStorage.getItem("name")
	const email = localStorage.getItem("email")

	if (!name && !email) {
		window.location.href = "/"
	}

	const [messageValue, setMessageValue] = useState("")
	const [messages, setMessages] = useState([])
	const [render, reRender] = useState(false)
	

	// axios call for fetching the values
	const [pageNumber, setPageNumber] = useState(1)
	const { loading, error, msg, hasMore } = useInfiniteScrolling(pageNumber)

	const observer = useRef()
	const lastMsgRef = useCallback(node => {
		if (loading) return;
		if (observer.current) observer.current.disconnect()
		observer.current = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting && hasMore) {
				setPageNumber(prev => prev+1)
			}
		})
		if (node) observer.current.observe(node)
	}, [loading, hasMore])

	useEffect(() => { 
		setMessages(msg)
	}, [msg])

	const handleSendMessage = (e) => {
		e.preventDefault();
		let array = [...messages];
		array.unshift({name: name, email: email, message: messageValue, created_on: new Date() })
		setMessages(array)
		setMessageValue("")
		reRender(value => !value)

		axios.post("https://live-socket-chat-app.herokuapp.com/api/message", {name: name, email: email, message: messageValue})
		.then(socket.emit("messageSent", name, email, messageValue, Date.now() ))
		.catch(err => console.log(err))
	}

	const handleChange = (msg) => {
		setMessageValue(msg)
	}


	const DisplayMe = ({ forwardedRef, itemitem }) => {
		const date = new Date(itemitem.created_on).toLocaleDateString() + " " + new Date(itemitem.created_on).toLocaleTimeString()
		return (
			<div ref={forwardedRef} className="m-2 w-fit max-w-[60%] h-fit bg-[#1e1e38] p-2 rounded-lg ml-auto text-right min-w-[120px] break-word"><p className="text-[11px] text-sky-300">{ itemitem && itemitem.name }</p>{ itemitem && itemitem.message }<p className="text-gray-500 text-[8px]">{itemitem && date}</p></div>
		)
	}

	const DisplayOther = ({forwardedRef, itemitem }) => {
		const date = new Date(itemitem.created_on).toLocaleDateString() + " " + new Date(itemitem.created_on).toLocaleTimeString()
		return (
			<div ref={forwardedRef} className="m-2 w-fit max-w-[60%]  bg-[#1e1e38] p-2 rounded-lg min-w-[120px] break-word"><p className="text-[11px] text-sky-400">{ itemitem && itemitem.name }</p>{itemitem && itemitem.message}<p className="text-gray-500 text-[8px]">{itemitem && date}</p></div>
		)
	}

	
	useEffect(() => {
		socket.on("messageRecieved", (name, email, message, date) => {
			const item = {name: name, email: email, message: message, created_on: date}
			return (
				setMessages(prev => [item, ...prev])
			)
		})
	
	}, [socket])

	let counter = 0;

	const logout = () => {
		localStorage.removeItem("name")
		localStorage.removeItem("email")
		window.open(`/`, "_self")
	}

	return (
		<div className="border-solid  p-2 m-2 rounded-md h-[95vh] max-w-[100vw] bg-[#373952]">
			<div id="header" className="flex p-4 items-center w-[100%] h-[10%] bg-[#373952] border-b-2 border-solid border-[#555555] ">
				<p className="text-gray-300 text-lg">#General Chat Room</p>
				<button onClick={logout} className="ml-auto bg-white text-black p-2 w-20 rounded-md hover:bg-red-700 hover:text-white">Logout</button>
			</div>
			<div id="messages" className="flex flex-col-reverse bg-transparent w-[100%] h-[80%] rounded-md p-4 text-white overflow-scroll">
				{messages.map((item, index) => {
					if (messages.length === index+1) {
						return (
							item.email === email ? 
								<DisplayMe forwardedRef={lastMsgRef} key={counter++} itemitem={item} /> : 
								<DisplayOther forwardedRef={lastMsgRef} key={counter++} itemitem={item} />
						)
					} else {
						return (
							item.email === email ? 
								<DisplayMe key={counter++} itemitem={item} /> : 
								<DisplayOther key={counter++} itemitem={item} />
						)
					}
				})}
				<p className="text-center text-gray-500">{loading && "Loading..."}</p>
				<p className="text-center text-red-500">{error && "Error!!"}</p>
			</div>
			<div className="input w-[100%] h-[10%]">
				<form action="" className="w-[100%] h-[100%] flex items-center justify-center">
					<input type="text" onChange={event => handleChange(event.target.value)} value={messageValue} className="bg-transparent border-2 border-[#1e1e42] w-[85%] h-[50px] rounded-md outline-none p-2 pl-4 text-white" />
					<button type="submit" onClick={(event) => handleSendMessage(event)} className="bg-[#25245e] text-white p-2 w-[100px] h-[50px] ml-[1%] rounded-lg">
						Send
					</button>
				</form>
			</div>
		</div>
	)
}