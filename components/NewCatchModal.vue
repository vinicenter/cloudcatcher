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
  
    await $fetch('/api/catches', {
      method: 'POST',
      body: form,
      onResponse: () => {
        toast.add({
          title: 'Success',
          description: 'The catch has been created',
        })
  
        emit('refresh')

        model.value = false
      },
    })
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
          <h2>New catch</h2>
        </div>
      </template>

      <template #default>
        <form @submit.prevent="submit" id="new-catch-form">
          <div class="space-y-4">
            <UInput name="title" placeholder="Title" required />
  
            <UInput type="file" name="image" placeholder="Image" required />
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
            form="new-catch-form"
          >
            Save
          </UButton>
        </div>
      </template>
    </UCard>

  </UModal>
</template>
