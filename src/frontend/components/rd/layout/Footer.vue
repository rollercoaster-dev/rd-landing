<script setup lang="ts"></script>

<template>
  <footer class="border-t bg-background/95">
    <div
      class="container py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground"
    >
      <div class="flex items-center gap-3">
        <span class="font-semibold text-foreground">rollercoaster.dev</span>
      </div>
      <nav class="flex items-center gap-6">
        <a href="/legal/impressum" class="hover:text-primary">Impressum</a>
        <a href="/legal/privacy" class="hover:text-primary">Datenschutz</a>
        <a
          href="https://github.com/rollercoaster-dev"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-primary"
          >GitHub</a
        >
        <a href="mailto:dev@rollercoaster.dev" class="hover:text-primary"
          >Email</a
        >
      </nav>
    </div>
  </footer>
</template>
