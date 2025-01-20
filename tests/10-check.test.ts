import { test, expect } from '@playwright/test';


test('Checkbox test', async ({ page }) => {

	await page.goto('/');

	const checkbox = page.getByRole('checkbox');
	const textarea = page.locator('#textarea');
	const msg = 'Anim laborum excepteur';

	await expect(textarea).toBeDisabled();
	await expect(textarea).toBeEmpty();

	await checkbox.check();
	await expect(textarea).toBeEnabled();

	await textarea.fill(msg);
	await expect(textarea).toHaveValue(msg);

	await page.getByRole('button', { name: 'Register'}).click();

	const validations = page.locator('.invalid-feedback');
	await expect(validations).toHaveCount(3);

	for (const msg of await validations.all()) {
		await expect(msg).toBeVisible();
	}
	
	await expect(validations.first()).toContainText('Valid first name is required');
});


test('Negating matches', async ({ page }) => {
	await page.goto('/');

	await expect(page.getByTestId('location')).toContainText('on the planet');
	await expect(page.getByTestId('location')).not.toContainText('Akron, OH');
})


test('Soft assertion tests', async ({ page }) => {
	await page.goto('/');

	await expect.soft(page.getByTestId('location')).not.toContainText('Deserunt adipiscing nisi');
	await expect.soft(page.getByTestId('location')).not.toContainText('Consectetur ad');
	await expect.soft(page.getByTestId('location')).not.toContainText('Nostrud');
})