const { onRequest } = require('firebase-functions/v2/https');
const generatePdf = require('./generatePdf');

exports.pdf = onRequest(async (req, res) => {
	const body = req.body || {};
	const filename = body.filename || 'data';
	const data = body.data;

	// ⛔ Exit
	if (!data) return res.status(400).send('data is required');

	await generatePdf
		.generate(body)
		.then((pdfBuffer) => {
			res.setHeader('Content-Type', 'application/pdf');
			res.setHeader('Content-Disposition', `attachment; filename=${filename}.pdf`);
			res.status(200);
			res.send(pdfBuffer);
		})
		.catch((e) => {
			res.status(500).send(e.message);
		});
});
