const Airtable = require('airtable')

// Authenticate
Airtable.configure({
	apiKey: process.env.AIRTABLE_API_KEY,
})

// Initialize a base
const base = Airtable.base(process.env.AIRTABLE_BASE_ID)

// Reference a table
const table = base(process.env.AIRTABLE_TABLE_NAME)

// To get meaningful records array
const minifyRecords = (records) =>
	records.map((record) => ({
		id: record.id,
		fields: record.fields,
	}))

export { table, minifyRecords }
