import { test, expect } from '@playwright/test';
import fs from 'fs';

test.skip('Download test file', async ({ page }) => {

	await page.goto('/savings.html');

	const downloadPromise = page.waitForEvent('download');

	await page.getByText('Download Our Offer').click();

	const download = await downloadPromise;

	// fails to run because this file opens in the browser rather than being downloaded.

});

test('Download test zip', async ({ page }) => {

	await page.goto('/savings.html');

	const downloadPromise = page.waitForEvent('download');

	await page.getByText('Download .Zip').click();

	const download = await downloadPromise;

	const suggestedFileName = download.suggestedFilename();
	const filePath = 'download/' + suggestedFileName;
	await download.saveAs(filePath);

	expect(await download.failure()).toBeNull();

	expect(fs.existsSync(filePath)).toBeTruthy();

	const fileSizeInBytes = fs.statSync(filePath).size;
	console.log(fileSizeInBytes);
	expect(fileSizeInBytes).toBeLessThan(20_000);

});
