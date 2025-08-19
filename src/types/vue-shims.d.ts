declare module "*.vue" {
  import type { DefineComponent } from "vue";

  const component: DefineComponent<
    Record<string, unknown>,
    Record<string, unknown>,
    unknown
  >;
  export default component;
}

// Vue i18n global properties
import { ComposerTranslation } from "vue-i18n";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $t: ComposerTranslation;
  }
}

// Additional module declarations for better compatibility
declare module "vue-router/auto-routes" {
  const routes: never[];
  export { routes };
}
