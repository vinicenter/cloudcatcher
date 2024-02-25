<script setup lang="ts">
const isDeleteOpen = ref(false);
</script>

<template>
  <div class="flex flex-col gap-1">
    <UAlert
      class="bg-red-700"
      :actions="[
        {
          variant: 'solid',
          color: 'primary',
          label: 'Take me to a safer place',
          to: '/account'
        },
        {
          variant: 'outline',
          color: 'red',
          label: 'Delete account',
          click: () => (isDeleteOpen = true)
        }
      ]"
      title="Your account will be deleted permanently."
      description="This action cannot be undone."
      icon="i-mdi-trash-can"
    />
  </div>

  <UModal v-model="isDeleteOpen">
    <div class="p-4">
      <h2 class="text-lg font-bold">Are you sure?</h2>
      <p class="text-sm">This action cannot be undone.</p>
      <p class="text-sm">You still can still create another account later.</p>
      <div class="flex justify-end gap-2 mt-4">
        <UButton variant="outline" color="primary" @click="isDeleteOpen = false">Cancel</UButton>
        <UButton variant="solid" color="red">Delete my account</UButton>
      </div>
    </div>
  </UModal>
</template>
