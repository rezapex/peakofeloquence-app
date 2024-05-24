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
      <div
        class="absolute inset-0 landing-grid z-[-1] [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] dark:[mask-image:radial-gradient(100%_100%_at_top_right,black,transparent)]"
      />

      <!--------- SITE SECTION --------->
      <template #title>
        <span class="font-montserrat font-bold text-5xl">
          Discover the
          <span
            class="bg-gradient-to-r from-grayscale-800 via-grayscale-600 to-grayscale-500 dark:from-grayscale-300 dark:via-grayscale-300 dark:to-grayscale-400 bg-clip-text text-transparent"
          >
            Wisdom
          </span>
          of
        </span>
        <br />
        <span
          class="font-playfair-display font-bold text-5xl bg-gradient-to-r from-grayscale-800 via-grayscale-800 to-grayscale-500 dark:from-grayscale-400 dark:via-grayscale-500 dark:to-grayscale-600 bg-clip-text text-transparent"
        >
          Nahj al-Balagha
        </span>
      </template>

      <!--------- HERO SECTION --------->
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

    <!-------IMG----------->

    <ULandingSection>
      <SplineFrame />
    </ULandingSection>

    <!------------------>

    <!--------- SITE SECTION --------->
    <ULandingSection
      v-for="(section, index) in page.sections"
      :key="index"
      :title="section.title"
      :description="section.description"
      :align="section.align"
      :features="section.features"
      class="bg-grayscale-50 dark:bg-gray-900"
    >
      <Placeholder1 />
    </ULandingSection>
    <!--------- SITE SECTION --------->
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
    <!--------- SITE SECTION --------->
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
            class="bg-grayscale-200 dark:bg-gray-700"
          />
        </div>
      </UPageColumns>
    </ULandingSection>
    <!--------- SITE SECTION --------->
    <ULandingSection class="bg-grayscale-50 dark:bg-gray-900">
      <ULandingCTA v-bind="page.cta" class="bg-grayscale-200 dark:bg-gray-700" />
    </ULandingSection>
  </div>
</template>

<style scoped>
.landing-grid {
  background-size: 100px 100px;
  background-image: linear-gradient(to left, rgb(100, 100, 100) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(100, 100, 100) 1px, transparent 1px);
}
</style>
