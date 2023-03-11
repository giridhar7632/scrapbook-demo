import { useToast } from '@chakra-ui/react'
import { createContext, useState } from 'react'

const PostsContext = createContext()

const PostsProvider = ({ children }) => {
	const [posts, setPosts] = useState([])
	const toast = useToast()

	const addPost = async (formData) => {
		try {
			const res = await fetch('/api/createPost', {
				method: 'POST',
				body: formData,
			})
			const newPost = await res.json()
			setPosts((prevPosts) => {
				return [newPost, ...prevPosts]
			})
			toast({
				title: 'Hurray!!! 🎉',
				description: 'Post added ✌',
				status: 'success',
				duration: 1500,
				isClosable: true,
			})
		} catch (error) {
			console.error(error)
			toast({
				title: 'Something went wrong!!! 😕',
				description: error.messsage ? error.messsage : '',
				status: 'error',
				duration: 1500,
				isClosable: true,
			})
		}
	}

	const deletePost = async (data) => {
		console.log(data)
		try {
			const res = await fetch('/api/deletePost', {
				method: 'DELETE',
				body: { ...data },
			})
		} catch (error) {
			console.error(error)
			toast({
				title: 'Something went wrong!!! 😕',
				description: error.messsage ? error.messsage : '',
				status: 'error',
				duration: 1500,
				isClosable: true,
			})
		}
	}

	return (
		<PostsContext.Provider
			value={{
				posts,
				setPosts,
				addPost,
				deletePost,
			}}>
			{children}
		</PostsContext.Provider>
	)
}

export { PostsContext, PostsProvider }
