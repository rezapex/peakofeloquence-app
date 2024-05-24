<script setup lang="ts">
import type { NavItem } from "@nuxt/content/dist/runtime/types";
import { useAppConfig, useColorMode } from "#imports";
const appConfig = useAppConfig();
const navigation = inject<Ref<NavItem[]>>("navigation", ref([]));
const colorMode = useColorMode();

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

// Define the mapContentNavigation method
function mapContentNavigation(navigation: NavItem[]): NavItem[] {
  // Your logic here to map the navigation items
  return navigation;
}
</script>

<template>
  <UHeader :links="links">
    <!-- Logo -->
    <template #logo>
      <div class="flex items-center">
        <img
          v-if="colorMode.preference === 'light'"
          src="/nav-logo-dark.png"
          alt="Logo"
          class="h-7 w-auto mr-3"
        />
        <img v-else src="/nav-logo-light.png" alt="Logo" class="h-7 w-auto mr-3" />
      </div>
    </template>

    <!-- Header Right -->
    <template #right>
      <UColorModeButton />
      <UButton label="Donate" color="gray" to="/donate" />
    </template>

    <UButton
      v-for="(link, index) in links"
      :key="index"
      v-bind="{ color: 'gray', variant: 'ghost', ...link }"
    />

    <template #panel>
      <UNavigationTree :links="mapContentNavigation(navigation)" default-open />
    </template>
  </UHeader>
</template>
