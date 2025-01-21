import { test, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const REPO = "Playwright-Test-Repo";
const REPO_OWNER = "[ACCOUNT ID HERE]";
const REPO_URL = `https://www.github.com/${REPO_OWNER}`;
const API_URL = 'https://api.github.com';
const FILE_PATH = path.join(__dirname, "../src/files");
const FILE_NAME = "dummy.txt";
const TOKEN = `[TOKEN HERE]`; //obvi, don't do this in Production.

test.use({
	baseURL: API_URL,
	extraHTTPHeaders: {
		Accept: "application/vnd.github.v3+json",
		Authorization: `token ${TOKEN}`,
	},
});

test.beforeEach("Create repo", async ({ request }) => {
	const response = await request.post("user/repos", {
		// headers: extraHTTPHeaders
		data: {
			name: REPO,
			default_branch: "main",
			private: false,
		},
	});

	expect(response.ok()).toBeTruthy();
});

test("Work with the new repo", async ({ page }) => {
	try {
		await page.goto(`${REPO_URL}?tab=repositories`);

		console.log(`<< ${FILE_PATH}/${FILE_NAME}`);

		await expect(page.getByRole("link", { name: REPO })).toHaveCount(1);

		const fileContent = fs.readFileSync(`${FILE_PATH}/${FILE_NAME}`, 'utf-8');

		const response = await page.request.put(
			`${API_URL}/repos/${REPO_OWNER}/${REPO}/contents/${FILE_NAME}`,
			{
				// headers: extraHTTPHeaders,
				data: {
					message: "Adding a dummy file via Playwright API",
					content: Buffer.from(fileContent).toString("base64"),
					branch: "main",
				},
			}
		);

		const responseData = await response.json();

		if (response.ok()) {
			console.log(`File committed successfully! Commit URL: ${responseData.commit.html_url}`);
		} else {
			throw new Error(`Failed to commit file: ${responseData.message}`);
		}
	} catch (error) {
		console.error("Error:", error);
	}
});

test.afterEach("Delete repo", async ({ request }) => {
	const response = await request.delete(`repos/${REPO_OWNER}/${REPO}`, {
		// headers: extraHTTPHeaders
	});

	expect(response.ok()).toBeTruthy();
	expect(response.status() === 204);
});

/*
	// Steps to how you might add and commit the file via the UI 
	// Login steps needed
	await page.fill('input[name="message"]', 'Adding a dummy file via Playwright');
	await page.click('button:has-text("Commit changes")');

	// Verify the commit was successful
	await page.goto(`${REPO_URL}/${REPO}/blob/main/${FILE_NAME}`);
	const fileExists = await page.isVisible(`text=This is a dummy file.`);

	if (fileExists) {
		console.log('File committed successfully!');
	} else {
		throw new Error('File was not committed successfully.');
	}
*/
