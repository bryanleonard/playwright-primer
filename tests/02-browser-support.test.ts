import { test } from "@playwright/test";

test("Browser support test", async ({ page, browserName, isMobile }) => {
	
	const now = new Date();
	const timestamp = now.toISOString().replace(/[:.]/g, "-");
	const mobile = isMobile ? "mobile" : "desktop";

	console.log(`Running: ${browserName}`);

	await page.goto("https://www.whatsmybrowser.org/");
	await page.screenshot({
		path: `tests-screenshots/pw-${browserName}-${mobile}-${timestamp}.png`,
	});

	await page.close();

});

// V1 of this test. It should be run with the `--workers=1` flag to prevent async from running multiple times
// This test is also kind of an anti-pattern.
// import { test, chromium, webkit, firefox } from "@playwright/test";

// test("Browser support test", async () => {
// 	const browserTypes = [chromium, firefox, webkit];
// 	const now = new Date();
// 	const timestamp = now.toISOString().replace(/[:.]/g, "-");

// 	for (const browserType of browserTypes) {
// 		console.log(`Running: ${browserType.name()}`);

// 		const browser = await browserType.launch();
// 		const page = await browser.newPage();

// 		await page.goto("https://www.whatsmybrowser.org/");
// 		await page.screenshot({
// 			path: `tests-screenshots/pw-${browserType.name()}-${timestamp}.png`,
// 		});

// 		await page.close();
// 		await browser.close();
// 	}
// });

