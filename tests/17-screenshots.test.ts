import { test, expect } from '@playwright/test';

test('Screenshots test', async ({ page, browserName, isMobile }) => {

	const now = new Date();
	const timestamp = now.toISOString().replace(/[:.]/g, "-");
	const mobile = isMobile ? "mobile" : "desktop";

	await page.goto('/');

	await page.getByRole('button', { name: 'Register' }).click();

	page.screenshot({
		path: `tests-screenshots/pw-test17-${browserName}-${mobile}-${timestamp}.png`,
		fullPage: true
	});

	await expect(page.locator('.invalid-feedback')).toHaveCount(4); //correct count is 3
});
