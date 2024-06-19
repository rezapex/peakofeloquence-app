<script setup lang="ts">
const { data: page } = await useAsyncData('index', () => queryContent('/').findOne())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  titleTemplate: '',
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description
})
</script>

<template>
  <div v-if="page">
    <ULandingHero
      :title="page.hero.title"
      :description="page.hero.description"
      :links="page.hero.links"
    >
      <div class="absolute inset-0 landing-grid z-[-1] [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" />
      <template #title>
        <span class="font-montserrat font-bold text-6xl hero-title">
          Discover the
          <span class="hero-title-gradient"> Wisdom </span>
          of
        </span>
        <br />
        <span class="font-playfair-display font-bold text-6xl hero-title-gradient">
          Nahj al-Balagha
        </span>
      </template>
      <template #headline>
        <UBadge
          v-if="page.hero.headline"
          variant="subtle"
          size="lg"
          class="relative rounded-full font-semibold"
        >
          <NuxtLink
            :to="page.hero.headline.to"
            target="_blank"
            class="focus:outline-none"
            tabindex="-1"
          >
            <span
              class="absolute inset-0"
              aria-hidden="true"
            />
          </NuxtLink>

          {{ page.hero.headline.label }}

          <UIcon
            v-if="page.hero.headline.icon"
            :name="page.hero.headline.icon"
            class="ml-1 w-4 h-4 pointer-events-none"
          />
        </UBadge>
      </template>
    </ULandingHero>

    <ULandingSection>
      <Placeholder />
    </ULandingSection>

    <ULandingSection
      v-for="(section, index) in page.sections"
      :key="index"
      :title="section.title"
      :description="section.description"
      :align="section.align"
      :features="section.features"
    >
      <Placeholder />
    </ULandingSection>

    <ULandingSection
      :title="page.features.title"
      :description="page.features.description"
    >
      <UPageGrid>
        <ULandingCard
          v-for="(item, index) in page.features.items"
          :key="index"
          v-bind="item"
        />
      </UPageGrid>
    </ULandingSection>

    <ULandingSection
      :headline="page.testimonials.headline"
      :title="page.testimonials.title"
      :description="page.testimonials.description"
    >
      <UPageColumns class="xl:columns-4">
        <div
          v-for="(testimonial, index) in page.testimonials.items"
          :key="index"
          class="break-inside-avoid"
        >
          <ULandingTestimonial
            v-bind="testimonial"
            class="bg-gray-100/50 dark:bg-gray-800/50"
          />
        </div>
      </UPageColumns>
    </ULandingSection>

    <ULandingSection>
      <ULandingCTA
        v-bind="page.cta"
        class="bg-gray-100/50 dark:bg-gray-800/50"
      />
    </ULandingSection>
  </div>
</template>

<style scoped>
.landing-grid {
  background-size: 100px 100px;
  background-image:
    linear-gradient(to right, rgb(var(--color-gray-200)) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(var(--color-gray-200)) 1px, transparent 1px);
}
.dark {
  .landing-grid {
    background-image:
      linear-gradient(to right, rgb(var(--color-gray-800)) 1px, transparent 1px),
      linear-gradient(to bottom, rgb(var(--color-gray-800)) 1px, transparent 1px);
  }
}
</style>





<!-- <template>
  <div
    v-if="page"
    class="bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-colors duration-500"
  >
    <ULandingHero
      :title="page.hero.title"
      :description="page.hero.description"
      :links="page.hero.links"
    >
      <template #title>
        <span class="font-montserrat font-bold text-6xl hero-title">
          Discover the
          <span class="hero-title-gradient"> Wisdom </span>
          of
        </span>
        <br />
        <span class="font-playfair-display font-bold text-6xl hero-title-gradient">
          Nahj al-Balagha
        </span>
      </template>

      <template #headline>
        <UBadge
          v-if="page.hero.headline"
          variant="subtle"
          size="lg"
          class="relative rounded-full font-semibold bg-primary-100 dark:bg-primary-700"
        >
          <NuxtLink
            :to="page.hero.headline.to"
            target="_blank"
            class="focus:outline-none"
            tabindex="-1"
          >
            <span class="absolute inset-0" aria-hidden="true" />
          </NuxtLink>
          {{ page.hero.headline.label }}
          <UIcon
            v-if="page.hero.headline.icon"
            :name="page.hero.headline.icon"
            class="ml-1 w-4 h-4 pointer-events-none"
          />
        </UBadge>
      </template>
    </ULandingHero>

    <ULandingSection>
      <Placeholder />
    </ULandingSection>

    <ULandingSection
      v-for="(section, index) in page.sections"
      :key="index"
      :description="section.description"
      :align="section.align"
      :features="section.features"
      class="bg-primary-900 text-neutral-100 py-12 px-6 sm:px-12 flex flex-col lg:flex-row items-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-12"
    >
      <template #title>
        <h2 class="text-4xl font-bold mb-4">{{ section.title }}</h2>
      </template>
      <template #description>
        <p class="text-lg text-neutral-300 mb-6">{{ section.description }}</p>
      </template>
      <Placeholder />
    </ULandingSection>

    <ULandingSection
      :title="page.features.title"
      :description="page.features.description"
      class="bg-neutral-50 dark:bg-neutral-900"
    >
      <UPageGrid>
        <ULandingCard
          v-for="(item, index) in page.features.items"
          :key="index"
          v-bind="item"
          class="bg-white dark:bg-neutral-800"
        />
      </UPageGrid>
    </ULandingSection>

    <ULandingSection
      :headline="page.testimonials.headline"
      :title="page.testimonials.title"
      :description="page.testimonials.description"
      class="bg-neutral-50 dark:bg-neutral-900"
    >
      <UPageColumns class="xl:columns-4">
        <div
          v-for="(testimonial, index) in page.testimonials.items"
          :key="index"
          class="break-inside-avoid"
        >
          <ULandingTestimonial
            v-bind="testimonial"
            class="bg-primary-100 dark:bg-primary-700"
          />
        </div>
      </UPageColumns>
    </ULandingSection>

    <ULandingSection class="bg-neutral-50 dark:bg-neutral-900">
      <ULandingCTA v-bind="page.cta" class="bg-primary-100 dark:bg-primary-700" />
    </ULandingSection>
  </div>
</template>

<style scoped>
.hero-title {
  font-family: "Montserrat", sans-serif;
  letter-spacing: 0.05em;
  color: #000; /* Black color for better contrast */
}

.hero-title-gradient {
  background: linear-gradient(to right, #2196f3, #42a5f5); /* Fresh gradient */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.custom-title-class {
  font-family: "Playfair Display", serif;
  font-size: 3rem;
  font-weight: bold;
  color: #000; /* Black color for better contrast */
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
}

.custom-description-class {
  font-size: 1.125rem;
  line-height: 1.75rem;
  color: #000; /* Black color for better contrast */
  letter-spacing: 0.02em;
  margin-top: 1rem;
  margin-bottom: 2rem;
}

.bg-neutral-50 {
  background-color: #fafafa; /* Light neutral background */
}

.dark .bg-neutral-900 {
  background-color: #212121; /* Dark neutral background for dark mode */
}

.text-neutral-900 {
  color: #212121; /* Dark neutral text */
}

.dark .text-neutral-100 {
  color: #f5f5f5; /* Light neutral text for dark mode */
}

.transition-colors {
  transition: color 0.5s, background-color 0.5s;
}

.font-montserrat {
  font-family: "Montserrat", sans-serif;
}

.font-playfair-display {
  font-family: "Playfair Display", serif;
}
</style> -->