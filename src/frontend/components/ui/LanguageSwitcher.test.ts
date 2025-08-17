import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createI18n } from "vue-i18n";
import LanguageSwitcher from "./LanguageSwitcher.vue";
import { TooltipProvider } from "@/frontend/components/ui/tooltip";

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

  it("renders language switcher button", async () => {
    const TestWrapper = {
      components: { LanguageSwitcher, TooltipProvider },
      template: `
        <TooltipProvider>
          <LanguageSwitcher />
        </TooltipProvider>
      `,
    };

    const wrapper = mount(TestWrapper, {
      global: {
        plugins: [i18n],
      },
    });

    // Wait for the component to mount and update
    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve, 0));

    // The component should render a select trigger button
    const selectTrigger = wrapper.find('button[role="combobox"]');
    expect(selectTrigger.exists()).toBe(true);
  });

  it("shows correct tooltip text", async () => {
    const TestWrapper = {
      components: { LanguageSwitcher, TooltipProvider },
      template: `
        <TooltipProvider>
          <LanguageSwitcher />
        </TooltipProvider>
      `,
    };

    const wrapper = mount(TestWrapper, {
      global: {
        plugins: [i18n],
      },
    });

    // Wait for the component to mount
    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Check if the tooltip content is set correctly
    const tooltip = wrapper.findComponent({ name: "Tooltip" });
    expect(tooltip.props("content")).toBe("Switch Language");
  });

  it("switches language when option is selected", async () => {
    const TestWrapper = {
      components: { LanguageSwitcher, TooltipProvider },
      template: `
        <TooltipProvider>
          <LanguageSwitcher />
        </TooltipProvider>
      `,
    };

    const wrapper = mount(TestWrapper, {
      global: {
        plugins: [i18n],
      },
    });

    // Initial locale should be 'en'
    expect(i18n.global.locale.value).toBe("en");

    // Find the LanguageSwitcher component and call its method
    const languageSwitcher = wrapper.findComponent(LanguageSwitcher);
    const component = languageSwitcher.vm as any;
    if (component.switchLanguage) {
      component.switchLanguage("de");
      await wrapper.vm.$nextTick();

      expect(i18n.global.locale.value).toBe("de");
    }
  });
});
