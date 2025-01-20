import { test, expect } from '@playwright/test';

const name = 'Staniel';

test('Session or local storage test', async ({ page }) => {

	await page.goto('/');

	const input = page.getByLabel('First name');
	await input.fill(name);
	await page.getByRole('button', {name: 'Save Input' }).click();
	await expect(input).toHaveValue(name);

	const storage = await page.evaluate(() => window.localStorage);
	console.log(storage);

	//clear
	await page.evaluate(() => window.localStorage.clear());
	await page.reload();
	await expect(input).toHaveValue('');

	//set
	await page.evaluate(setLocalStorage);
	await page.reload();
	await expect(input).toHaveValue(name);

});

function setLocalStorage() {
	localStorage.setItem('firstName', 'Staniel');
}

//localtStorage can be replaced with sessionStorage if that's how the data is saved.