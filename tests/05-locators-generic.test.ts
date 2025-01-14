import { test, expect } from '@playwright/test';

test('Generic locators', async ({ page }) => {
	await page.goto('');

	await page.locator('.needs-validation label[for="firstName"]').fill('Bryan')
	await page.locator('//form//button[2]').click();

	await page.getByRole('button', {name: 'Register', exact: true}).click();

	await expect(page.getByText('Valid last name is required')).toBeVisible();

});