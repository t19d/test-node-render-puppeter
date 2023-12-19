const puppeteer = require('puppeteer');

const generate = async () => {
	// await puppeteer.createBrowserFetcher().download(puppeteer.PUPPETEER_REVISIONS.chromium);

	const browser = await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox'],
	});
	const page = await browser.newPage();

	await page.setContent('<p>hola patata</p>', {
		waitUntil: 'domcontentloaded',
	});

	await page.emulateMediaType('screen');
	const file = await page.pdf({ format: 'A4' });
	await browser.close();

	return file;
};

module.exports = {
	generate,
};
