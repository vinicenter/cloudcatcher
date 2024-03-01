<script setup lang="ts">
const navBarLinks = computed(() => [
	{ name: 'Home', path: '/' },
	{ name: 'Catches', path: '/catches' },
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
							:to="link.path"
							class="hover:text-green-600"
							active-class="text-green-600"
						>
							{{ link.name }}
						</ULink>
					</template>
				</div>

				<AccountPopover />
			</div>
		</div>

    <slot />
	</UContainer>
</template>
