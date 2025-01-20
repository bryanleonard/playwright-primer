import { test, expect } from '@playwright/test';

test('Cookies test', async ({ page }) => {

	await page.goto('/');

	console.log(await page.context().cookies());

	await page.context().addCookies([{
		name: 'pwCookie1',
		value: '1siekooCwp',
		url: 'http://localhost:3000'
	}]);

	console.log(await page.context().cookies());

	await page.context().clearCookies();

	console.log(await page.context().cookies());
});

