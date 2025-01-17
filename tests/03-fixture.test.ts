import { test, chromium, expect } from '@playwright/test';

test('Test with Fixtures', async({ page }) => {
	await page.goto('https://playwright.dev');

	const pgTitle = await page.title();

	console.log(`Target page title: ${pgTitle}`);

	await expect(page).toHaveTitle(/Playwright/);
});

test('Test Localhost', async({ page }) => {
	await page.goto('http://localhost:3000');

	await expect(page).toHaveTitle('Imaginary Credit Association');
	await expect(page).toHaveURL('http://localhost:3000');
});