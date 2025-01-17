import { test, expect } from '@playwright/test';

const homeTitle = 'Imaginary Credit Association';
const savingsTitle = 'Imaginary Credit Association - Save with us'

test('Page navigation test', async ({ page }) => {

	await page.goto('/');
	await expect(page).toHaveTitle(homeTitle);
	
	await page.goto('savings.html');
	await expect(page).toHaveTitle(savingsTitle);

	await page.goBack();
	await expect(page).toHaveTitle(homeTitle);

	await page.goForward();
	await expect(page).toHaveTitle(savingsTitle);

	await page.reload();
	await expect(page).toHaveTitle(savingsTitle);
	
});


test('navigation and timeout test', async ({ page }) => {
	await page.goto('/', {waitUntil: 'load', timeout: 2500 });
	await expect(page).toHaveTitle(homeTitle);
});