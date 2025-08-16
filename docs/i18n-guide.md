# Vue i18n Internationalization Guide

This guide explains how to use the Vue i18n internationalization system implemented in this project.

## Overview

The project uses Vue i18n v9 with the following setup:

- **Languages**: English (en) - default, German (de)
- **Fallback**: English is used when German translations are missing
- **Organization**: Translation files are organized by feature areas
- **SSR Support**: Fully compatible with vite-ssg

## File Structure

```
src/frontend/locales/
├── en/
│   ├── common.json      # Shared UI elements, buttons, actions
│   ├── header.json      # Header component translations
│   ├── home.json        # Landing page content
│   ├── about.json       # About page content
│   └── admin.json       # Admin panel translations
└── de/
    ├── common.json      # German translations
    ├── header.json
    ├── home.json
    ├── about.json
    └── admin.json
```

## Using Translations in Components

### Template Usage (Global)

```vue
<template>
  <!-- Simple translation -->
  <h1>{{ $t("home.hero.title") }}</h1>

  <!-- With interpolation -->
  <p>{{ $t("common.greeting", { name: "John" }) }}</p>

  <!-- For attributes -->
  <button :aria-label="$t('common.buttons.close')">
    {{ $t("common.buttons.close") }}
  </button>
</template>
```

### Script Setup Usage (Composition API)

```vue
<script setup>
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();

// Use in reactive data
const title = computed(() => t("home.hero.title"));

// Use in functions
const handleClick = () => {
  alert(t("common.actions.success"));
};

// Change language
const switchLanguage = (lang) => {
  locale.value = lang;
};
</script>
```

## Translation Key Structure

Use hierarchical keys for better organization:

```json
{
  "common": {
    "buttons": {
      "save": "Save",
      "cancel": "Cancel",
      "delete": "Delete"
    },
    "status": {
      "loading": "Loading...",
      "error": "Error occurred"
    }
  },
  "home": {
    "hero": {
      "title": "Welcome",
      "subtitle": "Get started today"
    }
  }
}
```

## Adding New Translations

### 1. Add to English file first

```json
// src/frontend/locales/en/common.json
{
  "buttons": {
    "newButton": "New Button"
  }
}
```

### 2. Add German translation

```json
// src/frontend/locales/de/common.json
{
  "buttons": {
    "newButton": "Neue Schaltfläche"
  }
}
```

### 3. Use in component

```vue
<template>
  <button>{{ $t("common.buttons.newButton") }}</button>
</template>
```

## Language Switching

The language switcher is available in the header. Users can:

- Click the language icon to see available languages
- Select their preferred language
- Language preference is saved to localStorage

### Programmatic Language Switching

```vue
<script setup>
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

// Switch to German
locale.value = "de";

// Switch to English
locale.value = "en";
</script>
```

## Best Practices

### 1. Key Naming

- Use descriptive, hierarchical keys
- Group related translations together
- Use camelCase for key names

### 2. Pluralization

```json
{
  "items": "no items | one item | {count} items"
}
```

```vue
<template>
  <p>{{ $tc("items", count, { count }) }}</p>
</template>
```

### 3. HTML in Translations

For simple formatting, use v-html:

```json
{
  "welcome": "Welcome <strong>{name}</strong>!"
}
```

```vue
<template>
  <p v-html="$t('welcome', { name: 'John' })"></p>
</template>
```

### 4. Long Text

For long content, consider breaking into smaller, reusable pieces:

```json
{
  "about": {
    "intro": "First paragraph...",
    "details": "Second paragraph...",
    "conclusion": "Final thoughts..."
  }
}
```

## Development Workflow

1. **Add English translation first** - This ensures fallback works
2. **Add German translation** - Keep structure identical
3. **Test both languages** - Use the language switcher
4. **Check fallbacks** - Remove German key temporarily to test fallback

## Common Patterns

### Dynamic Content

```vue
<script setup>
const { t } = useI18n();

const items = [
  { key: "apple", name: t("fruits.apple") },
  { key: "banana", name: t("fruits.banana") },
];
</script>
```

### Conditional Text

```vue
<template>
  <p>{{ isLoggedIn ? $t("user.welcome") : $t("user.login") }}</p>
</template>
```

### Form Validation

```vue
<script setup>
const { t } = useI18n();

const rules = {
  required: (value) => !!value || t("validation.required"),
  email: (value) => /.+@.+\..+/.test(value) || t("validation.email"),
};
</script>
```

## Troubleshooting

### Missing Translation Warning

If you see warnings about missing keys:

1. Check if the key exists in the English file
2. Verify the key path is correct
3. Ensure the German translation exists

### Language Not Switching

1. Check if locale.value is being set correctly
2. Verify localStorage is working
3. Check browser console for errors

### SSR Issues

The i18n setup is configured for SSR compatibility. If you encounter issues:

1. Ensure translations are imported in main.ts
2. Check that the i18n instance is properly installed
3. Verify Vite plugin configuration

## Performance Notes

- Translation files are pre-compiled by the Vite plugin
- Only used translations are included in the bundle
- Language switching is instant (no network requests)
- Translations are cached in memory

## Future Enhancements

Consider these improvements for larger applications:

- Lazy loading of translation files
- Translation management tools
- Automated translation validation
- RTL language support
- Date/number localization
