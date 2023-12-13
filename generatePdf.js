const puppeteer = require('puppeteer');
require('dotenv').config();

const generatePdf = async (res) => {
	const browser = await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox'],
		executablePath: process.env.NODE_ENV === 'production' ? proccess.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath(),
	});
	const page = await browser.newPage();

	try {
		await page.setContent('<p>hola patata</p>', {
			waitUntil: 'domcontentloaded',
		});

		await page.emulateMediaType('screen');

		page.pdf({
			format: 'A4',
		})
			.then(async (file) => {
				await browser.close();

				res.setHeader('Content-Disposition', 'attachment; filename=hola.pdf');
				res.setHeader('Content-Type', 'application/pdf');
				res.send(file);
				return;
			})
			.catch(async (error) => {
				await browser.close();
				res.send(error);
				return;
			});
	} catch (error) {
		res.send(error);
		return;
	}
};

module.exports = {
	generatePdf,
};
