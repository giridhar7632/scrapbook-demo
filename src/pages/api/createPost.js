import nextConnect from 'next-connect'
import multer from 'multer'
import path from 'path'
import { table, minifyRecords } from '../../utils/Airtable'
import cloudinary from '../../utils/cloudinary'
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'

// multer config
const upload = multer({
	storage: multer.diskStorage({}),
	fileFilter: (req, file, cb) => {
		let ext = path.extname(file.originalname)
		if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
			cb(new Error('File type is not supported'), false)
			return
		}
		cb(null, true)
	},
})

const apiRoute = nextConnect({
	onError(error, req, res) {
		res.status(501).json(error)
	},
	onNoMatch(req, res) {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
	},
})

// Adds the middleware to Next-Connect
apiRoute.use(upload.single('image'))

apiRoute.post(async (req, res) => {
	const { user } = getSession(req, res)
	// Uploading file to cloudinary
	const result = await cloudinary.uploader.upload(req.file.path)
	// Create a new record with required fields
	const post = {
		image: result.secure_url,
		caption: req.body.caption,
		cloudinaryId: result.public_id,
		userId: user.sub,
		date: Date.now(),
	}

	// Create a record with the above fields in Airtable
	// the 'create' method accepts and returns an array of records
	const newRecords = await table.create([{ fields: post }])
	res.status(200).json(minifyRecords(newRecords)[0])
})

export default withApiAuthRequired(apiRoute)

export const config = {
	api: {
		bodyParser: false, // Disallow body parsing, consume as stream
	},
}
