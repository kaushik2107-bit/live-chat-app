import { useEffect, useState } from "react"
import axios from "axios"

export default function useInfiniteScrolling(pageNumber) {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [msg, setMsg] = useState([])
	const [hasMore, setHasMore] = useState(false)

	// useEffect(() => {
	// 	setMsg([])
	// }, [pageNumber])
	
	useEffect(() => {
		setLoading(true)
		setError(false)
		axios.get(`https://live-socket-chat-app.herokuapp.com/api/fetch/${pageNumber}`)
		.then(res => {
			setMsg(prev => {
				return [...prev, ...res.data.data]
			})
			setHasMore(res.data.data.length > 0)
			setLoading(false)
		})
		.catch(e => {
			setError(true)
			console.log(e)
		})
	}, [pageNumber])

	return { loading, error, msg, hasMore }
}