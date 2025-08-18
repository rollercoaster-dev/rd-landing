import type { RouteNamedMap } from "vue-router/auto";

// Simple typed navigation config used by the header
// Labels come from i18n using the provided keys

type NamedRoute = keyof RouteNamedMap;

export type NavTo<Name extends NamedRoute = NamedRoute> = {
  name?: Name;
  params?: Partial<RouteNamedMap[Name]["params"]>;
  path?: string;
  hash?: string;
};

export type NavItem<Name extends NamedRoute = NamedRoute> = {
  id: string;
  i18nKey: string; // e.g., 'header.nav.about'
  to?: NavTo<Name>; // internal route
  href?: string; // external link
  external?: boolean;
  icon?: string;
  children?: NavItem[];
  ariaLabelKey?: string;
};

export type NavConfig = {
  primary: NavItem[];
  ctas: NavItem[];
};

export const navConfig: NavConfig = {
  primary: [
    { id: "about", i18nKey: "header.nav.about", to: { path: "/about" } },
    {
      id: "how",
      i18nKey: "header.nav.howItWorks",
      to: { path: "/how-it-works" },
    },
    { id: "roadmap", i18nKey: "header.nav.roadmap", to: { path: "/roadmap" } },
  ],
  ctas: [
    {
      id: "waitlist",
      i18nKey: "header.nav.waitlist",
      to: { path: "/", hash: "#waitlist" },
      ariaLabelKey: "header.aria.waitlist",
    },
    {
      id: "contribute",
      i18nKey: "header.nav.contribute",
      href: "https://github.com/rollercoaster-dev",
      external: true,
      ariaLabelKey: "header.aria.contribute",
    },
  ],
};
