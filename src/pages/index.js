import { Flex, Grid, Text } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import { useContext, useEffect } from 'react'
import { PostsContext } from '../context/posts'
import { useUser } from '@auth0/nextjs-auth0'

export default function Index({ initialPosts }) {
	const { posts, setPosts } = useContext(PostsContext)
	const { user, error, isLoading } = useUser()

	useEffect(() => {
		setPosts(initialPosts)
	}, [initialPosts, setPosts])

	console.log(initialPosts, 'initialPosts')
	console.log(user, 'user')
	if (isLoading) return <div>Loading...</div>
	if (error) return <div>{error.message}</div>

	return (
		<Flex flexDirection='column' justifyContent='center' alignItems='center'>
			<Navbar user={user} />
			{user ? (
				<Flex w='100%' flexDirection='column' my={8}>
					{!posts.length ? (
						<Flex
							h={['30vh', '50vh']}
							w='100%'
							justifyContent='center'
							alignItems='center'>
							<Text fontSize={['2xl', '3xl']} opacity='0.2'>
								No Posts Added
							</Text>
						</Flex>
					) : (
						<Grid
							templateColumns={[
								'repeat(1, 1fr)',
								'repeat(2, 1fr)',
								'repeat(3, 1fr)',
							]}
							gap={6}
							m='0 auto'
							w={['90%', '85%']}>
							{posts.map((post) => {
								console.log(post)
								return <Card post={post.fields} id={post.id} key={post.id} />
							})}
						</Grid>
					)}
				</Flex>
			) : (
				<Flex
					h={['30vh', '50vh']}
					w='100%'
					justifyContent='center'
					alignItems='center'>
					<Text fontSize={['2xl', '3xl']} opacity='0.2'>
						You have to login
					</Text>
				</Flex>
			)}
		</Flex>
	)
}

export async function getServerSideProps(context) {
	try {
		const res = await fetch('http://localhost:3000/api/getPosts', {
			headers: { Cookie: context.req.headers.cookie },
		})
		return {
			props: {
				initialPosts: await res.json(),
			},
		}
	} catch (error) {
		console.log(error)
		return {
			props: {
				err: 'Something went wrong 😕',
			},
		}
	}
}
