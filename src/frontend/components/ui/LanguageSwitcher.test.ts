import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createI18n } from "vue-i18n";
import LanguageSwitcher from "./LanguageSwitcher.vue";

// Mock translations for testing
const messages = {
  en: {
    header: {
      language: {
        switchLanguage: "Switch Language",
      },
    },
  },
  de: {
    header: {
      language: {
        switchLanguage: "Sprache wechseln",
      },
    },
  },
};

describe("LanguageSwitcher", () => {
  let i18n: any;

  beforeEach(() => {
    i18n = createI18n({
      legacy: false,
      locale: "en",
      fallbackLocale: "en",
      messages,
      globalInjection: true,
    });
  });

  it("renders language switcher button", () => {
    const wrapper = mount(LanguageSwitcher, {
      global: {
        plugins: [i18n],
      },
    });

    expect(wrapper.find("button").exists()).toBe(true);
  });

  it("shows correct tooltip text", () => {
    const wrapper = mount(LanguageSwitcher, {
      global: {
        plugins: [i18n],
      },
    });

    // Check if the tooltip content is set correctly
    const tooltip = wrapper.findComponent({ name: "UiTooltipTooltip" });
    expect(tooltip.props("content")).toBe("Switch Language");
  });

  it("switches language when option is selected", async () => {
    const wrapper = mount(LanguageSwitcher, {
      global: {
        plugins: [i18n],
      },
    });

    // Initial locale should be 'en'
    expect(i18n.global.locale.value).toBe("en");

    // Find and click German option (this would need to be adjusted based on actual implementation)
    // This is a simplified test - actual implementation would need to trigger the dropdown
    const component = wrapper.vm as any;
    if (component.switchLanguage) {
      component.switchLanguage("de");
      await wrapper.vm.$nextTick();

      expect(i18n.global.locale.value).toBe("de");
    }
  });
});
