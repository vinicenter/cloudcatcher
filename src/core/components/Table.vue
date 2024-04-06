<script setup lang="ts" generic="T extends Record<string, any>">
interface Props {
  title: string
  newButtonLabel?: string
  loading?: boolean
  columns?: {
    key: string
    label: string
  }[]
  data: {
    count: number
    rows: T[]
    perPage: number
    page: number
  } | null
}

const queryParams = defineModel<{
  page: number
  perPage: number
  search: string
}>('queryParams', {
  required: true,
})

withDefaults(defineProps<Props>(), {
  newButtonLabel: 'New',
})

const emit = defineEmits<{
  (e: 'new'): void
}>()

const internalSearch = ref('')

const makeSearch = () => {
  Object.assign(queryParams.value, {
    ...queryParams.value,
    search: unref(internalSearch),
    page: 1,
  })
}
</script>

<template>
  <div>
    <div class="flex justify-between px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <div>
        {{ title }}
      </div>

      <div class="flex gap-2">
        <UButton
          color="primary"
          @click="emit('new')"
        >
          {{ newButtonLabel }}
        </UButton>

        <UInput
          v-model="internalSearch"
          placeholder="Search..."
          :disabled="loading"
          @keyup.enter="makeSearch"
        />
      </div>
    </div>

    <UTable
      :rows="data?.rows || []"
      :loading="loading"
      :columns="columns"
    />

    <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
      <UPagination
        v-model="queryParams.page"
        :page-count="queryParams.perPage"
        :total="data?.count || 0"
        :disabled="loading"
      />
    </div>
  </div>
</template>
