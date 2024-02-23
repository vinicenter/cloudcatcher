<script setup lang="ts">
const data = reactive({
  title: '',
  ipfsCid: '',
})

const submit = () => {
  $fetch('/api/catches', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
</script>

<template>
  <div>
    <input v-model="data.title" placeholder="Title" />
  
    <input v-model="data.ipfsCid" placeholder="IPFS CID" />
  
    <button @click="submit">Submit</button>
  </div>
</template>
