<template>
  <UHeader :links="links">
    <!-- Logo -->
    <template #logo>
      <div class="flex items-center">
        <img
          v-if="colorMode.preference === 'dark'"
          src="/public/gold-gradient-icon.png"
          alt="Logo"
          class="h-5 w-auto mr-3"
        />
        <img
          v-if="colorMode.preference === 'light'"
          src="/public/dark-gradient-icon.png"
          alt="Logo"
          class="h-5 w-auto mr-3"
        />
        <!-- <span class="text-md font-light text-gray-900 dark:text-gray-100 font-custom">
          peakofeloquence.org
        </span> -->
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

    <template #panel> </template>
  </UHeader>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
import { useAppConfig, useColorMode } from "#imports";
import type { NavItem } from "@nuxt/content/dist/runtime/types";

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
];
</script>
