<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <div class="w-64 bg-card border-r border-border">
      <div class="p-4 border-b border-border">
        <h2 class="text-xl font-bold">{{ $t("admin.title") }}</h2>
      </div>

      <nav class="p-4">
        <ul class="space-y-2">
          <li>
            <RouterLink
              to="/admin"
              class="flex items-center p-2 rounded-md hover:bg-muted transition-colors"
              :class="{
                'bg-muted': isActive('/admin') && !isActive('/admin/'),
              }"
            >
              <LayoutDashboard class="w-5 h-5 mr-2" />
              {{ $t("admin.navigation.dashboard") }}
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/admin/users"
              class="flex items-center p-2 rounded-md hover:bg-muted transition-colors"
              :class="{ 'bg-muted': isActive('/admin/users') }"
            >
              <Users class="w-5 h-5 mr-2" />
              {{ $t("admin.navigation.users") }}
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/admin/docs"
              class="flex items-center p-2 rounded-md hover:bg-muted transition-colors"
              :class="{ 'bg-muted': isActive('/admin/docs') }"
            >
              <FileText class="w-5 h-5 mr-2" />
              {{ $t("admin.navigation.documentation") }}
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/admin/projects"
              class="flex items-center p-2 rounded-md hover:bg-muted transition-colors"
              :class="{ 'bg-muted': isActive('/admin/projects') }"
            >
              <FolderKanban class="w-5 h-5 mr-2" />
              {{ $t("admin.navigation.projects") }}
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="flex-1 p-8">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import {
  LayoutDashboard,
  Users,
  FileText,
  FolderKanban,
} from "lucide-vue-next";

const route = useRoute();

// Helper function to check if a route is active
function isActive(path: string): boolean {
  return route.path === path || route.path.startsWith(`${path}/`);
}
</script>
