import { test, expect } from '@playwright/test';

test('Console test', async ({ page }) => {

	page.on('console', msg => {
		expect.soft(msg.type()).not.toEqual('Error');
	});

	page.on('pageerror', err => {
		console.log(`Found an error: ${err.name}, ${err.message}`);
		expect.soft(err.name).not.toEqual('error');
	});

	await page.goto('/');

	await page.getByRole('button', {name: 'Register' }).click();

});

