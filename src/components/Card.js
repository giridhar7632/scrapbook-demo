import { Box, Button, Text, useColorModeValue } from '@chakra-ui/react'
import { useContext } from 'react'
import { PostsContext } from '../context/posts'

const Card = ({ post, id }) => {
	const { deletePost } = useContext(PostsContext)
	return post ? (
		<Box
			w='100%'
			p={5}
			bg={useColorModeValue('white', 'gray.800')}
			flex='1'
			borderWidth='1px'
			borderColor={useColorModeValue('gray.100', 'gray.700')}
			rounded='lg'
			shadow='md'
			position='relative'>
			<Text textAlign='right' fontSize='sm' fontWeight='bold' mb={4}>
				{new Date(post.date).toString().substr(0, 15)}
			</Text>
			<a
				href={post.image}
				target='_blank'
				rel='noopener noreferrer'
				style={{ width: '300px', height: '300px', position: 'relative' }}>
				<img src={post.image} alt={post.cloudinaryId} loading='lazy' />
			</a>
			<Text fontSize='md' my={4} noOfLines={[3, 4, 5]} isTruncated>
				{post.caption}
			</Text>
			<Button
				size={'xs'}
				fontSize={'sm'}
				variant={'ghost'}
				my={2}
				color={'red'}
				alignSelf='flex-end'
				onClick={() => deletePost({ id, cloudinaryId: post.cloudinaryId })}>
				Delete
			</Button>
		</Box>
	) : null
}
export default Card
