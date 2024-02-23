<script setup lang="ts">
const {
	data
} = useFetch('/api/catches')
</script>

<template>
	<div>
		<NuxtLink to="/new-catch">Register new catch</NuxtLink>
		{{ data }}

	</div>
</template>
