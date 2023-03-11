import { UserProvider } from '@auth0/nextjs-auth0/client'
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import { Container } from '../components/Container'
import Meta from '../components/Meta'
import { PostsProvider } from '../context/posts'

import theme from '../utils/theme'

function MyApp({ Component, pageProps }) {
	return (
		<UserProvider>
			<PostsProvider>
				<ChakraProvider resetCSS theme={theme}>
					<Meta />
					<ColorModeProvider
						options={{
							useSystemColorMode: true,
						}}>
						<Container minH='100vh'>
							<Component {...pageProps} />
						</Container>
					</ColorModeProvider>
				</ChakraProvider>
			</PostsProvider>
		</UserProvider>
	)
}

export default MyApp
