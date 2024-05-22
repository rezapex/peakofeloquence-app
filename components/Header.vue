<script setup lang="ts">
import type { NavItem } from "@nuxt/content/dist/runtime/types";
import { useAppConfig } from "#imports";
const appConfig = useAppConfig();
const navigation = inject<Ref<NavItem[]>>("navigation", ref([]));

const links = [
  {
    label: "About",
    to: "/about/introduction",
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
        <img src="/public/nav-logo-light.png" alt="Logo" class="h-7 w-auto mr-3" />
      </div>
    </template>

    <!-- Header Right -->
    <template #right>
      <UColorModeButton />
      <UButton label="Support" color="gray" to="/donate" />
    </template>

    <UButton
      v-for="(link, index) of links"
      :key="index"
      v-bind="{ color: 'gray', variant: 'ghost', ...link }"
    />

    <template #panel>
      <UNavigationTree :links="mapContentNavigation(navigation)" default-open />
    </template>
  </UHeader>
</template>
