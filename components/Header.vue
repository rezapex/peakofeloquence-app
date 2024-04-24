<script setup lang="ts">
import type { NavItem } from '@nuxt/content/dist/runtime/types'

const navigation = inject<Ref<NavItem[]>>('navigation', ref([]))

const links = [{
  label: 'About',
  to: '/docs'
}, {
  label: 'Sermons',
  to: '/sermons/sermon_1'
}, {
  label: 'Letters',
  to: '/letters/letter_1'
},{
  label: 'Sayings',
  to: '/sayings/sayings'
}, 
{
  label: 'Resources',
  to: '/resources/'
}]
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      <div class="flex items-center">
        <img src="/favicon.ico" alt="Logo" class="h-8 w-auto mr-2" />
        <span>
          Peak of Eloquence
          <UBadge label=".org" variant="subtle" class="mb-0.5" />
        </span>
      </div>
    </template>
    <template #right>
      <UButton label="Donate" color="gray" to="/donate" />
      <!-- <UButton label="Sign up" icon="i-heroicons-arrow-right-20-solid" trailing color="black" to="/signup" class="hidden lg:flex" /> -->
    </template>
    <template #panel>
      <UNavigationTree :links="mapContentNavigation(navigation)" default-open />
    </template>
  </UHeader>
</template>

<style> </style>