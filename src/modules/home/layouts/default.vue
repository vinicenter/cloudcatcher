<script setup lang="ts">
import { useAuthStore } from '~/src/modules/accounts/store/useAuthStore';

const store = useAuthStore();

const navBarLinks = computed(() => [
	{ name: 'Home', path: '/' },
	{ name: 'Catches', path: '/catches' },
	{ name: 'Devices', path: '/devices', disabled: !store.isLogged },
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

				<AccountPopover />
			</div>
		</div>

    <slot />
	</UContainer>
</template>
