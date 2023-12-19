/* eslint-disable new-cap */
const pdfkit = require('pdfkit');

const generate = async (res) => {
	// const data = req.body; // Los datos recibidos en el body
	const data = {
		patata: 'cocinada',
		tortilla: 'con cebolla',
		emoji: '💩',
	};

	// Lógica para generar el PDF con los datos
	const pdfDoc = new pdfkit();
	pdfDoc.text(JSON.stringify(data));

	// Convierte el PDF a un Buffer
	const pdfBuffer = await new Promise((resolve, reject) => {
		const chunks = [];

		pdfDoc.on('data', (chunk) => {
			chunks.push(chunk);
		});

		pdfDoc.on('end', () => {
			resolve(Buffer.concat(chunks));
		});

		pdfDoc.on('error', (error) => {
			reject(error);
		});

		pdfDoc.end(); // Finaliza la generación del PDF
	});

	// Devuelve el PDF como respuesta
	return pdfBuffer;
};

module.exports = {
	generate,
};
