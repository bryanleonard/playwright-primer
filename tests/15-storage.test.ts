import { test, expect } from '@playwright/test';

const name = 'Staniel';

test('Local storage test', async ({ page }) => {

	await page.goto('/');

	const input = page.getByLabel('First name');
	await input.fill(name);
	await page.reload();
	await expect(input).toHaveValue('');

	await input.fill(name);
	await page.getByRole('button', {name: 'Save Input' }).click();
	await page.reload();
	await expect(input).toHaveValue(name);

	const storage = await page.context().storageState();
	console.log(storage.cookies);
	console.log(storage.origins[0].localStorage);
});

