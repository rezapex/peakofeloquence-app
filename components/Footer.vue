<script setup lang="ts">
const links = [{
  label: 'Resources',
  children: [{
    label: 'Donate',
    to: 'https://ko-fi.com/peakofeloquence'
  }, {
    label: 'Docs'
  }, {
    label: 'Roadmap'
  }, {
    label: 'Changelog'
  }]
}, {
  label: 'Features',
  children: [{
    label: 'Affiliates'
  }, {
    label: 'Portal'
  }, {
    label: 'Jobs'
  }, {
    label: 'Sponsors'
  }]
}, {
  label: 'Company',
  children: [{
    label: 'About'
  }, {
    label: 'Pricing'
  }, {
    label: 'Careers'
  }, {
    label: 'Blog'
  }]
}]

const toast = useToast()
const form = ref(null);  // Reference to the form element
const email = ref('')
const loading = ref(false)

async function onSubmit() {
  console.log("Form submission started"); // Check if function is called
  if (!form.value) {
    console.log("Form reference is missing");
    return;
  }

  loading.value = true;
  const formData = new FormData(form.value);

  try {
    const response = await fetch(form.value.action, {
      method: 'POST',
      body: formData,
    });
    console.log("Response received", response);

    if (response.ok) {
      toast.add({
        title: 'Subscribed!',
        description: 'You\'ve been subscribed to our newsletter.',
      });
      email.value = '';
    } else {
      toast.add({
        title: 'Error',
        description: 'There was a problem subscribing to the newsletter.',
      });
    }
  } catch (error) {
    console.error("Submission error", error);
    toast.add({
      title: 'Network Error',
      description: 'Please check your network connection.',
    });
  } finally {
    loading.value = false;
  }
}

</script>

<template>
  <UFooter>
    <template #top>
      <UFooterColumns :links="links">
        <template #right>
        <!-- FORM -->
          <form data-netlify="true" @submit.prevent="onSubmit">
            <UFormGroup label="Subscribe to our newsletter" :ui="{ container: 'mt-3' }">
              <UInput v-model="email" type="email" placeholder="Enter your email" :ui="{ icon: { trailing: { pointer: '' } } }" required size="xl" autocomplete="off" class="max-w-sm" input-class="rounded-full">
                <template #trailing>
                  <UButton type="submit" size="xs" color="primary" :label="loading ? 'Subscribing' : 'Subscribe'" :loading="loading" />
                </template>
              </UInput>
            </UFormGroup>
          </form>
          <!-- Form End -->
        </template>
      </UFooterColumns>
    </template>

    <template #left>
      <p class="text-gray-500 dark:text-gray-400 text-sm">
        Copyright © {{ new Date().getFullYear() }}. All rights reserved.
      </p>
    </template>

    <template #right>
      <UColorModeButton size="sm" />

      <UButton to="https://github.com/nuxt-ui-pro/saas" target="_blank" icon="i-simple-icons-github" aria-label="GitHub" color="gray" variant="ghost" />
    </template>
  </UFooter>
</template>
