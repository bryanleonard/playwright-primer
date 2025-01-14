import { test, expect } from '@playwright/test';

test('Test for multiple matches', async ({ page }) => {

	await page.goto('/');

	// This fails due to multiple links being targeted.
	//await page.getByRole('link').click();

	// Just something to test.
	await page.getByRole('button', {name: 'Register', exact: true}).click();

	const errorMsgs = page.locator('.invalid-feedback');

	await expect(errorMsgs).toHaveCount(3);

	for (const msg of await errorMsgs.all()) {
		await expect(msg).not.toBeEmpty();
	}
	
});


test('Multi step test', async ({ page }) => {

	await page.goto('/');
	
	const lastName = page.locator('#lastName');
	await lastName.fill('Leonard');

	await page.getByRole('button', {name: 'Register', exact: true}).click();

	const fnameWarning = page.getByText('Valid first name is required');

	await expect(fnameWarning).toBeVisible();

	

	await page.on('dialog', async (dialog) => {
		
		console.log('Hi', dialog.type());
		expect(dialog.type()).toEqual('confirm');

		expect(dialog.message()).toEqual('This will clear all inputs. Continue?');

		await dialog.accept();
	});


	await page.getByRole('button', {name: 'Clear', exact: true}).click();
	
	await lastName.clear();

	await expect(lastName).toBeEmpty();
	
});