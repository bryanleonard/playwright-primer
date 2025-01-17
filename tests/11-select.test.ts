import { test, expect } from '@playwright/test';


test('Select test', async ({ page }) => {

	await page.goto('/savings.html');

	const deposit = page.getByTestId('deposit');
	const period = page.getByTestId('period');
	const result = page.getByTestId('result');

	await deposit.fill('100');
	await period.selectOption('6 Months');
	await expect(result).toContainText('After 6 months you will earn $2.00 on your deposit');
	
	await period.selectOption({ label: '1 year' });
	await expect(result).toContainText('After 1 year you will earn $5.00 on your deposit');

});


