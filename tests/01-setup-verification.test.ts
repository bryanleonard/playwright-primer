import { test, chromium } from '@playwright/test';

test("Verify simple script", async () => {
	
	const browser = await chromium.launch();
	await browser.close();

	console.log(`Browser opened and closed successfully.`);
});