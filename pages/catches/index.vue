<script setup lang="ts">
const { data } = useFetch('/api/catches')
</script>

<template>
  <div class="grid grid-cols-3 gap-4">
		<UCard v-for="capture in data">
			<template #header>
				{{ capture.title }}
			</template>

			<div>
				{{ capture.ipfsCid }}
			</div>

			<template #footer>
				{{ capture.createdAt }}
			</template>
		</UCard>
	</div>
</template>
