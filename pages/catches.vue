<script setup lang="ts">
import { useAuthStore } from '~/store/useAuthStore';

const { data, refresh, status } = useFetch('/api/catches')

const {
  isLogged
} = useAuthStore()

const env = useRuntimeConfig()

const formatImageUrl = (image: string) => {
	return `${env.public.S3_BUCKET_PUBLIC_ENDPOINT}/${image}`
}

const showNewCatchModal = ref(false)
</script>

<template>
	<div class="space-y-2">
		<UButton @click="showNewCatchModal = true" v-if="isLogged">
			New catch
		</UButton>

		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
			<UCard v-if="status !== 'pending'" v-for="capture in data">
				<template #header>
					{{ capture.title }}
				</template>

				<img :src="formatImageUrl(capture.image)">

				<template #footer>
					{{ capture.createdAt }}
				</template>
			</UCard>

			<template v-else>
				<USkeleton class="w-full h-[300px]" />
				<USkeleton class="w-full h-[300px]" />
				<USkeleton class="w-full h-[300px]" />
			</template>
		</div>

		<NewCatchModal v-model="showNewCatchModal" @refresh="refresh" />
	</div>
</template>
