import { test, expect } from "@playwright/test";

test("should find bos loader configuration in localstorage", async ({ page }) => {
  await page.goto("/");

  await page.evaluate(() => {
    localStorage.setItem(
      "flags",
      JSON.stringify({ bosLoaderUrl: "http://127.0.0.1:8080/api/loader" })
    );
  });

  const localStoreFlags = await page.evaluate(() => localStorage.getItem("flags"));
  expect(localStoreFlags).toEqual(
    JSON.stringify({ bosLoaderUrl: "http://127.0.0.1:8080/api/loader" })
  );
});

test("should not get bos loader fetch error", async ({ page }) => {
  await page.goto("/every.near?v=0,0,1920,911&p=page");
  const bodyText = await page.textContent("body");
  expect(bodyText).not.toContain(
    'Source code for "/every.near?v=0,0,1920,911&p=page" is not found'
  );
});
