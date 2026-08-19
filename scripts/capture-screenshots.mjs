import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const outputDir = new URL("../docs/screenshots/", import.meta.url);
await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
await page.goto("http://127.0.0.1:3000/?demo=true");
await page.evaluate(() => window.localStorage.clear());
await page.reload();
await page.waitForLoadState("networkidle");
await page.getByText("Anonymous local demo").waitFor();
await page.addStyleTag({ content: "nextjs-portal { display: none !important; }" });
await page.screenshot({ path: new URL("portfolio-overview.png", outputDir).pathname, fullPage: true });

await page.getByRole("button", { name: "Crypto" }).click();
await page.screenshot({ path: new URL("filtered-assets.png", outputDir).pathname, fullPage: true });
await page.getByRole("button", { name: "Crypto" }).click();

await page.getByRole("button", { name: "Add asset" }).click();
await page.getByRole("menuitem", { name: "Stock" }).click();
await page.getByLabel("Name *").fill("European Dividend ETF");
await page.getByLabel("Symbol / Ticker").fill("TDIV");
await page.getByLabel("Units *").fill("18");
await page.getByLabel("Unit Price *").fill("42.50");
await page.screenshot({ path: new URL("asset-dialog.png", outputDir).pathname });

await browser.close();
