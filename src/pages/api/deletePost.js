// For deleting a record in Airtable
import { table, minifyRecords } from '../../utils/Airtable'
import cloudinary from '../../utils/cloudinary'

export default async (req, res) => {
	const { id, cloudinaryId } = req.body
	console.log(body)
	try {
		// Delete photo from cloudinary
		await cloudinary.uploader.destroy(cloudinaryId, (res) => console.log(res))
		// Delete record from Airtable
		// the 'destroy' method returns an array of deleted records
		const deletedRecords = await table.destroy([id])
		res.status(200).json(minifyRecords(deletedRecords))
	} catch (error) {
		console.log(error)
		res.status(500).json(error)
	}
}
