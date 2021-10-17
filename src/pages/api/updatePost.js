// For updating a record in Airtable
import { table, minifyRecords } from '../../utils/Airtable'
import cloudinary from '../../utils/cloudinary'

export default async (req, res) => {
	const { id } = req.body
	try {
		// Delete photo from cloudinary
		await cloudinary.uploader.destroy(fields.cloudinaryId)
		// Upload a new photo to cloudinary
		const record = await table.find(id)
		const data = minifyRecords(record)
		console.log(data)
		let result
		if (req.body.image) {
			const imgStr = req.body.image
			result = await cloudinary.uploader.upload(imgStr, {})
		}

		// Create a new record with updated
		const updatedRecord = {
			image: result?.secure_url || data.image,
			caption: req.body.caption || data.caption,
			cloudinaryId: result?.public_id || data.cloudinaryId,
			userId: data.userId,
		}

		// Update record with new fields
		const updatedRecords = await table.update([{ id, fields: updatedRecord }])
		res.status(200).json(minifyRecords(updatedRecords))
	} catch (error) {
		console.log(error)
		res.status(500).json({ msg: 'Something went wrong! 😕' })
	}
}
