<script setup lang="ts">
const { data: page } = await useAsyncData("index", () => queryContent("/").findOne());
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: "Page not found", fatal: true });
}

useSeoMeta({
  titleTemplate: "PeakofEloquence.org",
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description,
});
</script>

<template>
  <div
    v-if="page"
    class="bg-grayscale-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500"
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
          class="relative rounded-full font-semibold bg-grayscale-200 dark:bg-gray-700"
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
      class="bg-gray-900 text-gray-100 py-12 px-6 sm:px-12 flex flex-col lg:flex-row items-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-12"
    >
      <template #title>
        <h2 class="text-4xl font-bold mb-4">{{ section.title }}</h2>
      </template>
      <template #description>
        <p class="text-lg text-gray-300 mb-6">{{ section.description }}</p>
      </template>
      <Placeholder />
    </ULandingSection>

    <ULandingSection
      :title="page.features.title"
      :description="page.features.description"
      class="bg-grayscale-50 dark:bg-gray-900"
    >
      <UPageGrid>
        <ULandingCard
          v-for="(item, index) in page.features.items"
          :key="index"
          v-bind="item"
          class="bg-white dark:bg-gray-800"
        />
      </UPageGrid>
    </ULandingSection>

    <ULandingSection
      :headline="page.testimonials.headline"
      :title="page.testimonials.title"
      :description="page.testimonials.description"
      class="bg-grayscale-50 dark:bg-gray-900"
    >
      <UPageColumns class="xl:columns-4">
        <div
          v-for="(testimonial, index) in page.testimonials.items"
          :key="index"
          class="break-inside-avoid"
        >
          <ULandingTestimonial
            v-bind="testimonial"
            class="bg-grayscale-200 dark:bg-gray-800"
          />
        </div>
      </UPageColumns>
    </ULandingSection>

    <ULandingSection class="bg-grayscale-50 dark:bg-gray-900">
      <ULandingCTA v-bind="page.cta" class="bg-grayscale-200 dark:bg-gray-800" />
    </ULandingSection>
  </div>
</template>

<style scoped>
/* 
.hero-title {
  font-family: "Montserrat", sans-serif;
  letter-spacing: 0.05em; /* Adjust letter spacing for the main title 
}
*/

.hero-title-gradient {
  background: linear-gradient(
    to right,
    #68685a,
    #e6e4db,
    #ac8e62
  ); /* Enhanced gradient for readability */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* 
.font-playfair-display {
  font-family: "Playfair Display", serif;
}
*/
.custom-title-class {
  /* font-family: "Playfair Display", serif; */
  font-size: 3rem;
  font-weight: bold;
  color: white; /* Example color */
  /* letter-spacing: 0.05em;  */
  margin-bottom: 1rem; /* Adjust title bottom margin */
}

.custom-description-class {
  font-size: 1.125rem; /* Example size */
  line-height: 1.75rem; /* Example line height */
  color: white; /* Example color */
  letter-spacing: 0.02em; /* Adjust letter spacing for description */
  margin-top: 1rem; /* Example spacing */
  margin-bottom: 2rem; /* Adjust description bottom margin */
}
</style>
