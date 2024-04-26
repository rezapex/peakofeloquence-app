// This code snippet is a Vue component written using the Composition API and TypeScript
in a // single-file component format. Here's a breakdown of what it does:

<script setup lang="ts">
import type { NavItem } from "@nuxt/content/dist/runtime/types";

const navigation = inject<Ref<NavItem[]>>("navigation", ref([]));

const links = [
  {
    label: "About",
    to: "/docs",
  },
  {
    label: "Sermons",
    to: "/sermons/sermon_1",
  },
  {
    label: "Letters",
    to: "/letters/letter_1",
  },
  {
    label: "Sayings",
    to: "/sayings/sayings",
  },
  {
    label: "Blog",
    to: "/blog",
  },
];
</script>

<template>
  <UHeader :links="links">
    <!-- Logo -->
    <template #logo>
      <div class="flex items-center">
        <img src="/gold-icon.png" alt="Logo" class="h-7 w-auto mr-3" />
        <img src="/anotherone.png" alt="Heading" class="h-4 w-auto mr-3" />
      </div>
    </template>

    <!-- Header Right -->
    <template #right>
      <UButton label="Support" color="gray" to="/donate" />
      <!-- <UButton label="Sign up" icon="i-heroicons-arrow-right-20-solid" trailing color="black" to="/signup" class="hidden lg:flex" /> -->
    </template>

    <template #panel>
      <UNavigationTree :links="mapContentNavigation(navigation)" default-open />
    </template>
  </UHeader>
</template>
