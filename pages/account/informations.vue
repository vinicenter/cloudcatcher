<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const {
  user,
  refresh,
} = useAuthState()

const schema = z.object({
  name: z.string(),
  username: z.string()
})

type Schema = z.output<typeof schema>

const state = reactive({
  name: user.value?.name,
  username: user.value?.username
})

const toast = useToast()
const loading = ref(false)

async function onSubmit (event: FormSubmitEvent<Schema>) {
  loading.value = true

  await $fetch('/api/user', {
    method: 'PATCH',
    body: event.data,
    onResponse: () => {
      toast.add({
        title: 'Account informations updated',
        description: 'Your account informations has been updated successfully',
      })

      refresh()
    },
    onResponseError: () => {
      toast.add({
        title: 'Error',
        description: 'An error occured while updating your account informations',
        color: 'red'
      })
    }
  })

  loading.value = false
}

definePageMeta({
  name: 'account-informations',
})
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <div class="grid grid-cols-2 gap-4 w-full">
      <UFormGroup label="Name" name="name">
        <UInput v-model="state.name" />
      </UFormGroup>
  
      <UFormGroup label="Username" name="username">
        <UInput v-model="state.username" />
      </UFormGroup>
    </div>

    <UButton type="submit" :loading="loading">
      Update
    </UButton>
  </UForm>
</template>
