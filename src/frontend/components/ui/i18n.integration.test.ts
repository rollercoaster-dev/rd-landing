import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createI18n } from "vue-i18n";

// Import actual translation files
import enCommon from "../../locales/en/common.json";
import enHeader from "../../locales/en/header.json";
import enHome from "../../locales/en/home.json";
import deCommon from "../../locales/de/common.json";
import deHeader from "../../locales/de/header.json";
import deHome from "../../locales/de/home.json";

describe("i18n Integration Tests", () => {
  let i18n: any;

  beforeEach(() => {
    const messages = {
      en: {
        common: enCommon,
        header: enHeader,
        home: enHome,
      },
      de: {
        common: deCommon,
        header: deHeader,
        home: deHome,
      },
    };

    i18n = createI18n({
      legacy: false,
      locale: "en",
      fallbackLocale: "en",
      messages,
      globalInjection: true,
    });
  });

  describe("Translation File Structure", () => {
    it("should have consistent key structure between languages", () => {
      const enKeys = Object.keys(i18n.global.messages.value.en);
      const deKeys = Object.keys(i18n.global.messages.value.de);

      expect(enKeys).toEqual(deKeys);
      expect(enKeys).toContain("common");
      expect(enKeys).toContain("header");
      expect(enKeys).toContain("home");
    });

    it("should have all required common translations", () => {
      const commonKeys = ["buttons", "actions", "status", "navigation"];

      commonKeys.forEach((key) => {
        expect(i18n.global.messages.value.en.common).toHaveProperty(key);
        expect(i18n.global.messages.value.de.common).toHaveProperty(key);
      });
    });

    it("should have all required home page translations", () => {
      const homeKeys = [
        "hero",
        "whatWeBuild",
        "features",
        "vision",
        "currentWork",
        "getInvolved",
      ];

      homeKeys.forEach((key) => {
        expect(i18n.global.messages.value.en.home).toHaveProperty(key);
        expect(i18n.global.messages.value.de.home).toHaveProperty(key);
      });
    });
  });

  describe("Translation Functionality", () => {
    it("should translate common buttons correctly", () => {
      // Test English
      i18n.global.locale.value = "en";
      expect(i18n.global.t("common.buttons.learnMore")).toBe("Learn More");
      expect(i18n.global.t("common.buttons.viewOnGitHub")).toBe(
        "View on GitHub",
      );

      // Test German
      i18n.global.locale.value = "de";
      expect(i18n.global.t("common.buttons.learnMore")).toBe("Mehr erfahren");
      expect(i18n.global.t("common.buttons.viewOnGitHub")).toBe(
        "Auf GitHub ansehen",
      );
    });

    it("should translate hero section correctly", () => {
      // Test English
      i18n.global.locale.value = "en";
      expect(i18n.global.t("home.hero.title")).toBe("Rollercoaster.dev");
      expect(i18n.global.t("home.hero.subtitle")).toContain(
        "neurodivergent minds",
      );

      // Test German
      i18n.global.locale.value = "de";
      expect(i18n.global.t("home.hero.title")).toBe("Rollercoaster.dev");
      expect(i18n.global.t("home.hero.subtitle")).toContain(
        "neurodivergente Köpfe",
      );
    });

    it("should handle fallback correctly", () => {
      // Test fallback by using a non-existent key
      i18n.global.locale.value = "de";

      // This key doesn't exist, should fallback to key itself
      const result = i18n.global.t("nonexistent.key");
      expect(result).toBe("nonexistent.key");
    });
  });

  describe("Language Switching", () => {
    it("should switch languages correctly", () => {
      // Start with English
      i18n.global.locale.value = "en";
      expect(i18n.global.t("header.theme.switchToLight")).toBe(
        "Switch to light mode",
      );

      // Switch to German
      i18n.global.locale.value = "de";
      expect(i18n.global.t("header.theme.switchToLight")).toBe(
        "Zum hellen Modus wechseln",
      );

      // Switch back to English
      i18n.global.locale.value = "en";
      expect(i18n.global.t("header.theme.switchToLight")).toBe(
        "Switch to light mode",
      );
    });

    it("should maintain reactivity when switching languages", async () => {
      const TestComponent = {
        template: '<div>{{ $t("common.buttons.learnMore") }}</div>',
      };

      const wrapper = mount(TestComponent, {
        global: {
          plugins: [i18n],
        },
      });

      // Start with English
      i18n.global.locale.value = "en";
      await wrapper.vm.$nextTick();
      expect(wrapper.text()).toBe("Learn More");

      // Switch to German
      i18n.global.locale.value = "de";
      await wrapper.vm.$nextTick();
      expect(wrapper.text()).toBe("Mehr erfahren");
    });
  });

  describe("Complex Translation Keys", () => {
    it("should translate nested object keys correctly", () => {
      // Test English nested keys
      i18n.global.locale.value = "en";
      expect(i18n.global.t("home.hero.title")).toBe("Rollercoaster.dev");
      expect(i18n.global.t("home.whatWeBuild.title")).toBe(
        "What We're Building",
      );

      // Test German nested keys
      i18n.global.locale.value = "de";
      expect(i18n.global.t("home.hero.title")).toBe("Rollercoaster.dev");
      expect(i18n.global.t("home.whatWeBuild.title")).toBe(
        "Was wir entwickeln",
      );
    });
  });
});
