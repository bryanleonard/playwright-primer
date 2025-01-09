import { test } from "@playwright/test";

test("Browser support test", async ({page, browserName, isMobile}) => {
	
	const now = new Date();
	const timestamp = now.toISOString().replace(/[:.]/g, "-");
	const mobile = isMobile ? "mobile" : "desktop";

	console.log(`Running: ${browserName}`);

	await page.goto("https://www.whatsmybrowser.org/");
	await page.screenshot({
		path: `tests-screenshots/pw-${browserName}- ${mobile}-${timestamp}.png`,
	});

	await page.close();

});

