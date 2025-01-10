import { test, expect } from '@playwright/test';

test('Basic assertions', async() => {
	expect ('a').toEqual('a');
});