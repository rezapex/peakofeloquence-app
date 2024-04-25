<script setup lang="ts">
import { ref, reactive } from 'vue'

const links = [
  {
    label: 'Resources',
    children: [
      { label: 'Help center' },
      { label: 'Docs' },
      { label: 'Roadmap' },
      { label: 'Changelog' }
    ]
  },
  {
    label: 'Features',
    children: [
      { label: 'Affiliates' },
      { label: 'Portal' },
      { label: 'Jobs' },
      { label: 'Sponsors' }
    ]
  },
  {
    label: 'Company',
    children: [
      { label: 'About' },
      { label: 'Pricing' },
      { label: 'Careers' },
      { label: 'Blog' }
    ]
  }
]

const toast = useToast()
const formState = reactive({
  email: '',
  loading: false,
})

function onSubmit () {
  formState.loading = true
  setTimeout(() => {
    toast.add({
      title: 'Subscribed!',
      description: "You've been subscribed to our newsletter."
    })
    formState.loading = false
    formState.email = ''
  }, 1000)
}

</script>

<template>
  <UFooter>
    <template #top>
      <UFooterColumns :links="links">
        <template #right>
          <form
            netlify
            name="newsletter"
            method="POST"
            data-netlify="true"
            @submit.prevent="onSubmit"
          >
            <input type="hidden" name="form-name" value="newsletter" />
            <p hidden>
              <label>
                Don't fill this out: <input name="bot-field" />
              </label>
            </p>
            <UFormGroup label="Subscribe to our newsletter" :ui="{ container: 'mt-3' }">
              <UInput
                v-model="formState.email"
                type="email"
                placeholder="Enter your email"
                :ui="{ icon: { trailing: { pointer: '' } } }"
                required
                size="xl"
                autocomplete="off"
                class="max-w-sm"
                input-class="rounded-full"
                name="email"
              >
                <template #trailing>
                  <UButton
                    type="submit"
                    size="xs"
                    color="primary"
                    :label="formState.loading ? 'Subscribing' : 'Subscribe'"
                    :loading="formState.loading"
                  />
                </template>
              </UInput>
            </UFormGroup>
          </form>

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
      <UButton
        to="https://github.com/rezapex/peakofeloquence-app"
        target="_blank"
        icon="i-simple-icons-github"
        aria-label="GitHub"
        color="gray"
        variant="ghost"
      />
    </template>
  </UFooter>
</template>
