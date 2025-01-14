import { test, expect } from '@playwright/test';

test('Built-in locators', async ({ page }) => {
	await page.goto('');

	const firstName = page.getByLabel('First name');

	await firstName.fill('Dobson');
	await firstName.clear();
	await firstName.fill('Bryan');

	await page.getByRole('button', {name: 'Register', exact: true}).click();

	const lnameWarning = page.getByText('Valid last name is required');

	await expect(lnameWarning).toBeVisible();

	await page.locator('.needs-validation label[for="email"]');

	const emailWarning = page.getByText('Please enter a valid email address');

	await expect(emailWarning).toBeVisible();

});