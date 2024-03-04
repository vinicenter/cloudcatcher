<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
  name: 'devices',
})

const queryParams = ref({
  page: 1,
  perPage: 4,
  search: '',
  Test: 'asdas'
})

const { data, pending, execute } = useAuthFetch('/api/devices', {
  query: queryParams.value,
  watch: [queryParams],
})

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'description', label: 'Description' },
]

const isModalOpen = ref(false)
</script>

<template>
  <div>
    <Table
      v-model:queryParams="queryParams"
      title="Devices"
      new-button-label="Add device"
      :data="data"
      :loading="pending"
      :columns="columns"
      @new="isModalOpen = true"
    />

    <NewDevice v-model="isModalOpen" @refresh="execute" />
  </div>
</template>
