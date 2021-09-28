import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { ColorModeScript } from '@chakra-ui/react'

export default class Document extends NextDocument {
	render() {
		return (
			<Html>
				<Head>
          <title>@Scrapbook</title>
          <link
            rel='icon'
            href='https://res.cloudinary.com/scrapbook/image/upload/v1632762408/scrapbook-demo_nwmsy1.png'
          />
        </Head>
				<body>
					<ColorModeScript />
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
