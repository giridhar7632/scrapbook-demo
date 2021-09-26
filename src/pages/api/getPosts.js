// For retreving posts from Airtable
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import { table, minifyRecords } from '../../utils/Airtable'

export default withApiAuthRequired(async (req, res) => {
	const { user } = await getSession(req, res)

	try {
		const records = await table
			.select({ filterByFormula: `userId= '${user.sub}'` })
			.firstPage()
		const minfiedItems = minifyRecords(records)
		res.status(200).json(minfiedItems)
	} catch (error) {
		console.error(error)
		res.status(500).json({ msg: 'Something went wrong! 😕' })
	}
})
