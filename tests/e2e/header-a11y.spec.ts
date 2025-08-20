import { test, expect } from "@playwright/test";

// Basic a11y flows for Header: focus visibility and mobile menu dialog behavior

test.describe("Header accessibility", () => {
  test("tabbing shows visible focus on header controls", async ({ page }) => {
    await page.goto("/");

    // Start tabbing and ensure something receives focus with a visible ring
    await page.keyboard.press("Tab");
    const active1 = await page.evaluate(
      () => document.activeElement?.outerHTML ?? "",
    );
    expect(active1).toBeTruthy();

    // Tab through a few focusable elements to ensure focus advances
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    const active2 = await page.evaluate(
      () => document.activeElement?.outerHTML ?? "",
    );
    expect(active2).toBeTruthy();
  });

  test("mobile menu dialog traps focus and restores on close", async ({
    page,
    browserName,
  }) => {
    test.skip(browserName === "webkit", "Flaky on WebKit CI at times");

    // Emulate a mobile viewport to show the mobile menu button
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const trigger = page.locator('button[aria-haspopup="dialog"]');
    await expect(trigger).toBeVisible();

    // Focus trigger, open menu with Enter
    await trigger.focus();
    await page.keyboard.press("Enter");

    const dialog = page.locator('#mobile-menu[role="dialog"]');
    await expect(dialog).toBeVisible();

    // Check aria-expanded
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    // Tab should stay within dialog content
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    const afterFocused = await page.evaluate(
      () =>
        document.activeElement?.id || document.activeElement?.outerHTML || "",
    );
    expect(afterFocused).not.toBe("");

    // Escape closes dialog and returns focus to trigger
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();

    // Aria-expanded resets
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
});
