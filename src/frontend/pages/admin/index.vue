<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Admin Dashboard</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Dashboard Cards -->
      <UiCardCard class="hover:shadow-md transition-shadow">
        <UiCardCardHeader>
          <UiCardCardTitle>Users</UiCardCardTitle>
          <UiCardCardDescription
            >Manage user accounts and permissions</UiCardCardDescription
          >
        </UiCardCardHeader>
        <UiCardCardContent>
          <p class="text-2xl font-bold">0</p>
          <p class="text-sm text-muted-foreground">Total users</p>
        </UiCardCardContent>
        <UiCardCardFooter>
          <RouterLink
            to="/admin/users"
            class="text-sm text-primary hover:underline"
          >
            View Users →
          </RouterLink>
        </UiCardCardFooter>
      </UiCardCard>

      <UiCardCard class="hover:shadow-md transition-shadow">
        <UiCardCardHeader>
          <UiCardCardTitle>Documentation</UiCardCardTitle>
          <UiCardCardDescription
            >Manage documentation pages</UiCardCardDescription
          >
        </UiCardCardHeader>
        <UiCardCardContent>
          <p class="text-2xl font-bold">0</p>
          <p class="text-sm text-muted-foreground">Total documents</p>
        </UiCardCardContent>
        <UiCardCardFooter>
          <RouterLink
            to="/admin/docs"
            class="text-sm text-primary hover:underline"
          >
            View Docs →
          </RouterLink>
        </UiCardCardFooter>
      </UiCardCard>

      <UiCardCard class="hover:shadow-md transition-shadow">
        <UiCardCardHeader>
          <UiCardCardTitle>Projects</UiCardCardTitle>
          <UiCardCardDescription
            >Manage projects and tasks</UiCardCardDescription
          >
        </UiCardCardHeader>
        <UiCardCardContent>
          <p class="text-2xl font-bold">0</p>
          <p class="text-sm text-muted-foreground">Active projects</p>
        </UiCardCardContent>
        <UiCardCardFooter>
          <RouterLink
            to="/admin/projects"
            class="text-sm text-primary hover:underline"
          >
            View Projects →
          </RouterLink>
        </UiCardCardFooter>
      </UiCardCard>
    </div>
  </div>
</template>

<script setup lang="ts">
// Admin dashboard component
</script>
