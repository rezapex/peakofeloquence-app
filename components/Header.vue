<script setup lang="ts">
import { ref, inject, Ref } from "vue";
import type { NavItem } from "@nuxt/content/dist/runtime/types";
import { useAppConfig } from "#imports";
const appConfig = useAppConfig();
const navigation = inject<Ref<NavItem[]>>("navigation", ref([]));
const isMenuOpen = ref(false);

const links = [
  { label: "About", to: "/about/introduction" },
  { label: "Sermons", to: "/sermons/sermon_1" },
  { label: "Letters", to: "/letters/letter_1" },
  { label: "Sayings", to: "/sayings/sayings" },
  { label: "Blog", to: "/blog" },
];

function mapContentNavigation(navigation: NavItem[]): NavItem[] {
  return navigation;
}
</script>

<template>
  <UHeader class="flex justify-between items-center p-4 bg-white dark:bg-gray-900">
    <!-- Logo -->
    <div class="flex items-center">
      <img
        v-if="$colorMode.preference === 'light'"
        src="/public/nav-logo-black.png"
        alt="Logo"
        class="h-7 w-auto mr-3"
      />
      <img v-else src="/public/nav-logo-light.png" alt="Logo" class="h-7 w-auto mr-3" />
    </div>

    <!-- Hamburger Menu Button for Mobile -->
    <div class="md:hidden">
      <button @click="isMenuOpen = !isMenuOpen" class="focus:outline-none">
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>
    </div>

    <!-- Navigation Links -->
    <nav
      :class="{ block: isMenuOpen, hidden: !isMenuOpen }"
      class="md:flex md:items-center md:space-x-6"
    >
      <UButton
        v-for="(link, index) in links"
        :key="index"
        v-bind="{ color: 'gray', variant: 'ghost', ...link }"
        class="block md:inline-block my-2 md:my-0"
      />
    </nav>

    <!-- Header Right -->
    <div class="hidden md:flex items-center space-x-4">
      <UColorModeToggle />
      <UButton label="Support" color="gray" to="/donate" />
    </div>

    <!-- Mobile Navigation Panel -->
    <div :class="{ block: isMenuOpen, hidden: !isMenuOpen }" class="md:hidden mt-4">
      <UNavigationTree :links="mapContentNavigation(navigation)" default-open />
    </div>
  </UHeader>
</template>

<style scoped>
/* Custom styles if needed */
</style>
