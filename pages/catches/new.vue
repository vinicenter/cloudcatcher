<script setup lang="ts">
definePageMeta({
  middleware: [ 'auth' ]
})

const toast = useToast()

const submit = (e: Event) => {
  if (!(e.target instanceof HTMLFormElement)) return;

  const form = new FormData(e.target);

  $fetch('/api/catches', {
    method: 'POST',
    body: form,
    onResponseError: () => {
      toast.add({
        title: 'Error',
        description: 'An error occurred while sending the request',
      })
    },
    onResponse: () => {
      toast.add({
        title: 'Success',
        description: 'The catch has been created',
      })
    },
  })
}
</script>

<template>
  <form @submit.prevent="submit">
    <input name="title" placeholder="Title" required />

    <input type="file" name="image" placeholder="Image" required />

    <button type="submit">Submit</button>
  </form>
</template>
