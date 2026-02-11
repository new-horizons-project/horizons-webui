<template>
	<div class="input" :class="{ error: vErr }">
		<div class="placeholder">{{ text }}</div>
		<textarea :type="type" placeholder=" " @focus="vErr = false" v-model="value" />
	</div>
</template>

<script lang="ts" setup>

import { computed, ref } from 'vue'

const vErr = ref(false);

const props = defineProps<{
	text: string,
	type: string,
	modelValue?: string
}>();

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
	padding-top: 25px
	border-bottom-right-radius: 0
	color: var(--color)
	outline: none
	transition: border-color 0.3s, transform 0.15s
	position: relative

	.placeholder
		position: absolute
		left: -1px
		top: 12px
		font-size: 14px
		padding: 2px 9px
		border: 1px solid var(--border-color)
		border-radius: 10px
		background-color: var(--background-color-main)
		transform: translateY(-50%)
		user-select: none
		color: var(--color)
		pointer-events: none
		transition: border-color 0.3s, transform 0.15s
		z-index: 1
		border-top-right-radius: 0
		border-bottom-left-radius: 0

	textarea
		z-index: 2
		width: 100%
		max-width: 100%
		min-width: 100%
		font-size: 15px
		padding: 10px
		box-sizing: border-box
		background: none
		border: none
		color: inherit
		outline: none

	&:hover
		border-color: var(--border-active-color)

	&:focus-within, &:focus-within .placeholder
		border-color: var(--border-active-color)

	&.error 
		border-color: rgb(170, 50, 50)
</style>
