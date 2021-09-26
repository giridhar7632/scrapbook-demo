import { createContext, useState } from 'react'

const PostsContext = createContext()

const PostsProvider = ({ children }) => {
	const [posts, setPosts] = useState([])

	const addPost = async (formData) => {
		try {
			const res = await fetch('/api/createPost', {
				method: 'POST',
				body: formData,
			})
			const newPost = await res.json()
			console.log(newPost)
			setPosts((prevPosts) => {
				return [newPost, ...prevPosts]
			})
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<PostsContext.Provider
			value={{
				posts,
				setPosts,
				addPost,
			}}>
			{children}
		</PostsContext.Provider>
	)
}

export { PostsContext, PostsProvider }
