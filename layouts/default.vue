<script setup lang="ts">
const navBarLinks = [
	{ name: 'Home', path: '/' },
	{ name: 'Catches', path: '/catches' },
	{ name: 'New catche', path: '/catches/new' },
];
</script>

<template>
	<UContainer>
		<div class="h-10 m-2">
			<div class="flex justify-between items-center">
				<h1 class="text-3xl font-bold">CloudCatcher</h1>

				<div class="flex gap-4">
					<ULink
						v-for="link in navBarLinks"
						:key="link.path"
						:to="link.path"
						class="hover:text-green-600"
						active-class="text-green-600"
					>
						{{ link.name }}
					</ULink>
				</div>

				<a
					href="https://github.com/vinicenter/cloudcatcher"
					target="_blank"
					class="hover:text-green-600 flex items-center justify-center"
				>
					<UIcon class="text-[28px]" name="i-mdi-github" />
				</a>
			</div>
		</div>

    <NuxtPage />
	</UContainer>
</template>
