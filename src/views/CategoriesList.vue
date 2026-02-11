<template>
	<div class="categories-list-wrapper">
		<LinkedBlockImg />
	</div>
</template>

<script lang="ts" setup>

import LinkedBlockImg from '../components/LinkedBlockImg.vue';

</script>

<style lang="scss" scoped>

.categories-list-wrapper {
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
	width: 100%;
	justify-content: center;
	align-items: center;
}

</style>