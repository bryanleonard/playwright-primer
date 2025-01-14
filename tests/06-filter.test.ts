import { test, expect } from '@playwright/test';

test("Filtering test", async ({ page }) => {

	await page.goto('/savings.html');

	const rows = page.getByRole('row');

	const row = page.getByRole('row')
		.filter({ hasText: 'Competition '});

	await expect(row).toBeVisible();


	const cell = page.getByRole('row')
		.filter({ hasText: 'Competition '})
		.getByRole('cell')
		.nth(1);

	const cellText = await cell.textContent();

	expect(cellText).toBe('2%');
});