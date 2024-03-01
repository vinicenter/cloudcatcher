<script setup lang="ts">
import { useAuthStore } from '~/store/useAuthStore';

const { data, refresh } = useFetch('/api/catches')

const {
  isLogged
} = useAuthStore()

const env = useRuntimeConfig()

const formatImageUrl = (image: string) => {
	return `${env.public.BUCKET_R2_PUBLIC_ENDPOINT}/${image}`
}

const showNewCatchModal = ref(false)
</script>

<template>
	<div>
		<UButton @click="showNewCatchModal = true" v-if="isLogged">
			New catch
		</UButton>

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

		<NewCatchModal v-model="showNewCatchModal" @refresh="refresh" />
	</div>
</template>
