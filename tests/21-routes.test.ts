import { test, expect } from "@playwright/test";


test("Route abort with JS blocker", async ({ page }) => {

	page.route('**/*.{js}', route => route.abort()); // block all JS

	await page.goto('/savings.html');
	await page.getByTestId('deposit').fill('2500');

	await expect(page.getByTestId('result')).not.toBeVisible();
});

test.skip('Conditional routing example', async ({ page }) => {
	await page.route('**/*', route => {
		if (route.request().resourceType() === 'script') {
			route.abort();
		} else {
			route.continue();
		}
	})

	// ... do cool test things
});

test('Route fulfill', async ({ page }) => {

	const errorText = 'Oh no! File not found!'

	await page.route('**/*.pdf', roiute => {
		roiute.fulfill({
			status: 404, contentType: 'text/plain',
			body: errorText
		})
	});

	await page.goto('/savings.html');
	await page.getByText('Download Our Offer').click();

	await page.screenshot({
		path: `tests-screenshots/pw-21-routes-error.png`,
	});

	await page.waitForURL('**/*.pdf');
	const body = page.locator('body');

	await expect(body).toContainText(errorText);
	
})