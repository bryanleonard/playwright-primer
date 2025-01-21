import { test, expect } from '@playwright/test';

const people = [ 'Alice', 'Robert', 'Staniel' ];

for (const person of people) {
	test(`Testing ${person}`, async () => {
		expect(person).toEqual(person)
	});
}

const testMap = new Map();
testMap.set(1, 10);
testMap.set(2, 20);
testMap.set(3, 30);

for (const [key, value] of testMap) {
	test(`Testing 10x of ${key}/${value} pairs`, async() => {
		expect(key * 10).toEqual(value);
	});
}

const savingsOpts = [
	['10', '6 months', 'After 6 months you will earn $0.20 on your deposit'],
	['20', '1 year', 'After 1 year you will earn $1.00 on your deposit'],
	['50', '2 years', 'After 2 years you will earn $6.00 on your deposit']
]

for (const [sum, period, result] of savingsOpts) {
	test(`Testing multi params ${sum}, ${period}, ${result}`, async ({ page }) => {
		await page.goto('/savings.html');
		await page.getByTestId('deposit').fill(sum);
		await page.getByTestId('period').selectOption(period);

		await expect(page.getByTestId('result')).toHaveText(result);
	});
}