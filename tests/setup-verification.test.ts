import { chromium } from '@playwright/test';

(async function verifyScript() {
	const browser = await chromium.launch();
	await browser.close();

	console.log(`Browser opened and closed successfully.`);
})();