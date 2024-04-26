<script setup lang="ts">
import type { NavItem } from "@nuxt/content/dist/runtime/types";

const navigation = inject<Ref<NavItem[]>>("navigation", ref([]));

const links = computed(
  () => navigation.value.find((item) => item._path === "/letters")?.children ?? []
);
</script>

<template>
  <UContainer class="font-serif">
    <UPage>
      <template #left>
        <UAside>
          <template #top>
            <UContentSearchButton class="rounded-md" size="md" />
          </template>

          <UNavigationTree :links="mapContentNavigation(links)" />
        </UAside>
      </template>

      <NuxtPage />
    </UPage>
  </UContainer>
</template>
