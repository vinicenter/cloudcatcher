<script setup lang="ts">
const { data } = useFetch('/api/catches')

const env = useRuntimeConfig()

const formatImageUrl = (image: string) => {
	return `${env.public.BUCKET_R2_PUBLIC_ENDPOINT}/${image}`
}
</script>

<template>
  <div class="grid grid-cols-3 gap-4">
		<UCard v-for="capture in data">
			<template #header>
				{{ capture.title }}
			</template>

			<img :src="formatImageUrl(capture.image)">

			<template #footer>
				{{ capture.createdAt }}
			</template>
		</UCard>
	</div>
</template>
