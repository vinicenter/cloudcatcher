<script setup lang="ts">
const toast = useToast()

const emit = defineEmits<{
  (e: 'refresh'): void
}>()

const model = defineModel<boolean>()
const loadingSubmit = ref(false)

const submit = async (e: Event) => {
  try {
    loadingSubmit.value = true

    if (!(e.target instanceof HTMLFormElement)) return;
  
    const form = new FormData(e.target);
  
    await $fetch('/api/devices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        name: form.get('name'),
        description: form.get('description'),
      },
    })

    toast.add({
      title: 'Success',
      description: 'The device has been created',
    })

    emit('refresh')
    model.value = false
  } catch {
    toast.add({
      title: 'Error',
      description: 'An error occurred while sending the request',
    })
  } finally {
    loadingSubmit.value = false
  }
}
</script>

<template>
  <UModal v-model="model">
    <UCard>
      <template #header>
        <div>
          <h2>New device</h2>
        </div>
      </template>

      <template #default>
        <form @submit.prevent="submit" id="new-device-form">
          <div class="space-y-4">
            <UInput name="name" placeholder="Name" required />

            <UTextarea name="description" placeholder="Description" required />
          </div>
        </form>
      </template>

      <template #footer>
        <div class="flex justify-end gap-x-2">
          <UButton
            variant="outline"
            color="red"
            @click="model = false"
          >
            Close
          </UButton>

          <UButton
            color="primary"
            :loading="loadingSubmit"
            type="submit"
            form="new-device-form"
          >
            Save
          </UButton>
        </div>
      </template>
    </UCard>

  </UModal>
</template>
