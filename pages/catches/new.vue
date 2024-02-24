<script setup lang="ts">
const submit = (e: Event) => {
  if (!(e.target instanceof HTMLFormElement)) return;

  const form = new FormData(e.target);

  $fetch('/api/catches', {
    method: 'POST',
    body: form,
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
