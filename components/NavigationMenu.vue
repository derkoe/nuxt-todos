<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: "Todos",
      icon: "i-lucide-list-check",
      active: true,
      to: "/",
    },
  ],
  [
    {
      label: "GitHub",
      icon: "i-simple-icons-github",
      badge: "3.8k",
      to: "https://github.com/derkoe/nuxt-todos",
      target: "_blank",
    },
  ],
]);
</script>

<template>
  <UNavigationMenu color="neutral" :items="items" class="w-full" />
</template>
