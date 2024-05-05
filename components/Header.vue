<script setup lang="ts">
import type { NavItem } from "@nuxt/content/dist/runtime/types";
import { useAppConfig } from "#imports";
const { header } = useAppConfig();
const navigation = inject<Ref<NavItem[]>>("navigation", ref([]));
const appConfig = useAppConfig();
const primaryColor = appConfig.ui.primary;

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
        <img src="/gold-icon.png" alt="Logo" class="h-7 w-auto mr-3" />
        <img src="/anotherone.png" alt="Heading" class="h-4 w-auto mr-3" />
      </div>
    </template>

    <!-- Header Right -->
    <template #right>
      <UButton label="Support" color="gray" to="/donate" />
      <!-- <UButton label="Sign up" icon="i-heroicons-arrow-right-20-solid" trailing color="black" to="/signup" class="hidden lg:flex" /> -->
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
