<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const {
  user
} = useAuthState()

const schema = z.object({
  name: z.string(),
  username: z.string()
})

type Schema = z.output<typeof schema>

const state = reactive({
  name: '',
  username: user.value?.username
})

async function onSubmit (event: FormSubmitEvent<Schema>) {
  // Do something with data
  console.log(event.data)
}
</script>

<template>
  <AccountNavigation>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Name" name="name">
        <UInput v-model="state.name" />
      </UFormGroup>

      <UFormGroup label="Username" name="username">
        <UInput v-model="state.username" />
      </UFormGroup>

      <UButton type="submit">
        Update
      </UButton>
    </UForm>
  </AccountNavigation>
</template>
