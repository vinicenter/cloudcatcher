<script setup lang="ts">
const { data, execute } = useFetch('/api/user/whoami')

const logout = async () => {
	await $fetch('/api/logout')

	execute()
}

const navBarLinks = computed(() => [
	{ name: 'Home', path: '/' },
	{ name: 'Catches', path: '/catches' },
	{ name: 'New catche', path: '/catches/new', disabled: !data.value },
]);
</script>

<template>
	<UContainer>
		<div class="h-10 m-2">
			<div class="flex justify-between items-center">
				<h1 class="text-3xl font-bold">CloudCatcher</h1>

				<div class="flex gap-4">
					<template v-for="link in navBarLinks" :key="link.path">
						<ULink
							v-if="!link.disabled"
							:to="link.path"
							class="hover:text-green-600"
							active-class="text-green-600"
						>
							{{ link.name }}
						</ULink>
					</template>
				</div>

				<a
					v-if="!data"
					href="/api/login/github"
					class="hover:text-green-600 flex items-center justify-center"
				>
					<UButton v-if="!data">
						Entrar
						<UIcon class="text-xl" name="i-mdi-github" />
					</UButton>
				</a>

				<div
					v-else
					class="hover:text-green-600 flex items-center justify-center"
				>
					<UButton @click="logout">
						Sair
						<UIcon class="text-xl" name="i-mdi-logout" />
					</UButton>
				</div>
			</div>
		</div>

    <NuxtPage />
	</UContainer>
</template>
