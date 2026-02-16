<template>
	<div class="input" :class="{ error: vErr, small: small }">
		<div class="placeholder">{{ text }}</div>
		<input :type="type" placeholder=" " @focus="vErr = false" v-model="value" />
	</div>
</template>

<script lang="ts" setup>

import { computed, ref } from 'vue'

const vErr = ref(false);

const props = withDefaults(
	defineProps<{
		text: string,
		type: string,
		small: boolean,
		modelValue?: string
	}>(),
	{
		small: false
	}
);

const emit = defineEmits<{
	(e: 'update:modelValue', v: string): void
}>();

const value = computed<string>({
	get: () => props.modelValue ?? '',
	set: (v) => emit('update:modelValue', v)
});

function setError(val: boolean) {
	vErr.value = val
}

defineExpose({ setError });

</script>

<style lang="sass" scoped>
.input
	width: 100%
	border: 1px solid var(--border-color)
	border-radius: 15px
	padding-top: 15px
	color: var(--color)
	outline: none
	box-sizing: border-box
	transition: border-color 0.3s, transform 0.15s
	position: relative

	.placeholder
		position: absolute
		left: 15px
		top: 55%
		transform: translateY(-50%)
		user-select: none
		color: var(--color)
		transition: transform 0.15s, font-size 0.15s, opacity 0.15s
		pointer-events: none
		z-index: 1

	input
		z-index: 2
		font-size: 15px
		padding: 10px 15px
		box-sizing: border-box
		width: 97%
		background: none
		border: none
		color: inherit
		outline: none

	&.small
		input
			padding: 5px 10px
			font-size: 14px

		.placeholder
			left: 10px
			font-size: 14px
			top: 50%

		&:focus-within .placeholder, &:has(input:not(:placeholder-shown)) .placeholder
			transform: translateY(-110%)
			font-size: 12px
			opacity: 0.8
		

	&:hover
		border-color: var(--border-active-color)

	&:focus-within
		border-color: var(--border-active-color)
		
	&:focus-within .placeholder, &:has(input:not(:placeholder-shown)) .placeholder
		transform: translateY(-120%)
		font-size: 13px
		opacity: 0.8

	&.error 
		border-color: rgb(170, 50, 50)
</style>
