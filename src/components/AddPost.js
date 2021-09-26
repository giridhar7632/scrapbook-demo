import { useContext, useRef, useState } from 'react'
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	FormControl,
	FormLabel,
	Input,
	useDisclosure,
	useToast,
} from '@chakra-ui/react'
import { PostsContext } from '../context/posts'

export const AddPost = ({ children }) => {
	const [image, setImage] = useState()
	const [caption, setCaption] = useState('')
	const [previewSource, setPreviewSource] = useState('')
	const [fileInputState, setFileInputState] = useState('')

	const { addPost } = useContext(PostsContext)

	const { isOpen, onOpen, onClose } = useDisclosure()
	const toast = useToast()
	const initialRef = useRef()

	const handleFileInput = (e) => {
		const file = e.target.files[0]
		setPreviewSource(URL.createObjectURL(file))
		setImage(file)
		setFileInputState(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (!image) return

		let formData = new FormData()
		formData.append('image', image)
		formData.append('caption', caption)

		console.log(formData)

		console.log('sending data to api')
		addPost(formData)
		console.log('completed')

		toast({
			title: 'Hurray!!! 🎉',
			description: 'Post added ✌',
			status: 'success',
			duration: 1500,
			isClosable: true,
		})
		onClose()

		setCaption('')
		setFileInputState('')
		setPreviewSource('')
	}

	return (
		<>
			<Button variant='solid' size='md' colorScheme='yellow' onClick={onOpen}>
				{children}
			</Button>
			<Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader fontWeight='bold'>Add Post</ModalHeader>
					<ModalCloseButton />
					<form onSubmit={handleSubmit}>
						<ModalBody pb={6}>
							<FormControl>
								<FormLabel>Photo</FormLabel>
								<input
									type='file'
									name='image'
									ref={initialRef}
									onChange={handleFileInput}
									value={fileInputState}
									required
								/>
							</FormControl>

							{previewSource && (
								<img
									src={previewSource}
									alt='chosen'
									height='300px'
									width='300px'
									style={{ margin: '15px auto' }}
								/>
							)}

							<FormControl mt={4}>
								<FormLabel>Caption</FormLabel>
								<Input
									placeholder='Caption goes here...'
									type='text'
									value={caption}
									onChange={(e) => setCaption(e.target.value)}
								/>
							</FormControl>
						</ModalBody>

						<ModalFooter>
							<Button variant='solid' onClick={onClose} mr={4}>
								Cancel
							</Button>
							<Button type='submit' variant='solid' colorScheme='yellow' mr={4}>
								Create
							</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</>
	)
}
