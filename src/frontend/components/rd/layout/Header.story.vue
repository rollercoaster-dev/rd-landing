<script setup lang="ts">
// No components or imports needed
</script>

<template>
  <Story title="RD/Layout/Header" group="rd">
    <Variant title="Default">
      <div class="w-full">
        <header
          class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        >
          <div class="container flex h-16 items-center">
            <!-- Logo -->
            <a href="#" class="mr-8">
              <h1 class="text-2xl font-bold">
                <span
                  class="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
                  >rollercoaster.dev</span
                >
              </h1>
            </a>

            <!-- Navigation -->
            <nav class="flex items-center space-x-6 text-sm font-medium flex-1">
              <a href="#" class="transition-colors hover:text-primary">Home</a>
              <a href="#" class="transition-colors hover:text-primary">About</a>
              <a href="#" class="transition-colors hover:text-primary">Blog</a>
            </nav>

            <!-- Mode Toggles -->
            <div class="flex items-center space-x-1">
              <button class="rounded-full p-2 hover:bg-accent/10">
                <span class="sr-only">Toggle theme</span>
                <span class="h-5 w-5">🌙</span>
              </button>
              <button class="rounded-full p-2 hover:bg-accent/10">
                <span class="sr-only">Toggle intensity</span>
                <span class="h-5 w-5">🎨</span>
              </button>
            </div>
          </div>
        </header>
      </div>
    </Variant>

    <Variant title="With Content Below">
      <div class="w-full">
        <header
          class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        >
          <div class="container flex h-16 items-center">
            <!-- Logo -->
            <a href="#" class="mr-8">
              <h1 class="text-2xl font-bold">
                <span
                  class="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
                  >rollercoaster.dev</span
                >
              </h1>
            </a>

            <!-- Navigation -->
            <nav class="flex items-center space-x-6 text-sm font-medium flex-1">
              <a href="#" class="transition-colors hover:text-primary">Home</a>
              <a href="#" class="transition-colors hover:text-primary">About</a>
              <a href="#" class="transition-colors hover:text-primary">Blog</a>
            </nav>

            <!-- Mode Toggles -->
            <div class="flex items-center space-x-1">
              <button class="rounded-full p-2 hover:bg-accent/10">
                <span class="sr-only">Toggle theme</span>
                <span class="h-5 w-5">🌙</span>
              </button>
              <button class="rounded-full p-2 hover:bg-accent/10">
                <span class="sr-only">Toggle intensity</span>
                <span class="h-5 w-5">🎨</span>
              </button>
            </div>
          </div>
        </header>
        <div class="container mx-auto p-6">
          <h1 class="text-2xl font-bold mb-4">Page Content</h1>
          <p class="mb-4">
            This shows how the header looks in the context of a page with
            content below it.
          </p>
          <p>
            The header is sticky and will remain at the top of the viewport when
            scrolling.
          </p>
        </div>
      </div>
    </Variant>
  </Story>
</template>
