import { computed } from "vue";
import { useI18n } from "vue-i18n";
import type { RouteNamedMap } from "vue-router/auto";

type NamedRoute = keyof RouteNamedMap;

export type NavTo<Name extends NamedRoute = NamedRoute> = {
  name?: Name;
  params?: Partial<RouteNamedMap[Name]["params"]>;
  path?: string;
  hash?: string;
};

export type NavItem = {
  id: string;
  label: string; // Now contains the actual translated text
  to?: NavTo; // internal route
  href?: string; // external link
  external?: boolean;
  icon?: string;
  children?: NavItem[];
  ariaLabel?: string; // Now contains the actual translated aria label
};

export function useNavigation() {
  const { t } = useI18n();

  const primaryNav = computed((): NavItem[] => [
    {
      id: "about",
      label: t("header.nav.about"),
      to: { path: "/about" },
    },
    {
      id: "how",
      label: t("header.nav.howItWorks"),
      to: { path: "/how-it-works" },
    },
    {
      id: "roadmap",
      label: t("header.nav.roadmap"),
      to: { path: "/roadmap" },
    },
  ]);

  const ctas = computed((): NavItem[] => [
    // TODO: Implement email functionality for waitlist before re-enabling
    // The current waitlist section lacks proper email collection, storage, and notification system
    // See GitHub issue for implementation details
    // {
    //   id: "waitlist",
    //   label: t("header.nav.waitlist"),
    //   to: { path: "/", hash: "#waitlist" },
    //   ariaLabel: t("header.aria.waitlist"),
    // },
    {
      id: "contribute",
      label: t("header.nav.contribute"),
      href: "https://github.com/rollercoaster-dev",
      external: true,
      ariaLabel: t("header.aria.contribute"),
    },
  ]);

  return {
    primaryNav,
    ctas,
  };
}
