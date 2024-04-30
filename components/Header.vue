<script setup lang="ts">
import type { NavItem } from "@nuxt/content/dist/runtime/types";
import { useAppConfig } from "#imports";

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
      <button
        type="button"
        class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 p-1.5 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center"
        aria-label="Search"
      >
        <!--[--><!--[--><span
          class="i-heroicons-magnifying-glass-20-solid flex-shrink-0 h-5 w-5"
          aria-hidden="true"
        ></span
        ><!--]--><!--[--><!----><!--]--><!--[--><!----><!--]--><!--]-->
      </button>
      <button
        type="button"
        class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 p-1.5 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center"
        aria-label="Color picker"
      >
        <!--[--><!--[--><!----><!--]--><!--[--><span
          class="i-heroicons-swatch-20-solid w-5 h-5 text-primary-500 dark:text-primary-400"
        ></span
        ><!--]--><!--[--><!----><!--]--><!--]-->
      </button>
    </template>

    <template #panel>
      <UNavigationTree :links="mapContentNavigation(navigation)" default-open />
    </template>
  </UHeader>
</template>
