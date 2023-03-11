import { Button } from '@chakra-ui/button'
import { Flex, Text } from '@chakra-ui/layout'
import { DarkModeSwitch } from './DarkModeSwitch'
import { AddPost } from './AddPost'

const Navbar = ({ user }) => {
	console.log('user', !user)
	return (
		<Flex
			justifyContent='space-between'
			w='80vw'
			flexDirection={{ base: 'column', sm: 'row' }}
			m={4}>
			<Text
				mb={{ base: 4, md: 0 }}
				textAlign='center'
				fontWeight='bold'
				fontSize='2xl'>
				@Scrapbook
			</Text>
			<Flex justifyContent='space-between'>
				<AddPost disabled={!user}>Add Post</AddPost>
				{user ? (
					<a href='/api/auth/logout'>
						<Button variant='solid' colorScheme='blue' mx={4} size='md'>
							Logout
						</Button>
					</a>
				) : (
					<a href='/api/auth/login'>
						<Button variant='solid' colorScheme='blue' mx={4} size='md'>
							Login
						</Button>
					</a>
				)}
				<DarkModeSwitch />
			</Flex>
		</Flex>
	)
}

export default Navbar
