const { onRequest } = require('firebase-functions/v2/https');
const generatePdf = require('./generatePdf');

exports.pdf = onRequest(async (req, res) => {
	await generatePdf
		.generate(res)
		.then((pdfBuffer) => {
			res.status(200).header('Content-Disposition', 'attachment; filename=hola.pdf').header('Content-Type', 'application/pdf').send(pdfBuffer);
		})
		.catch((e) => {
			res.status(500).send(e.message);
		});
});
