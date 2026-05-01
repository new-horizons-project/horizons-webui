<template>
    <div class="top">
        <div class="path"
            v-for="(path, index) in currentPath"
            :key="path.to"
            :to="path.to"
        >
            <router-link class="link" :to="path.to">
                {{ path.label }}
            </router-link>

            <span v-if="index < currentPath.length - 1"> → </span>
        </div>
        <hr>
        <button v-if="showButton" @click="emit('click')">
			<span style="font-size: 14px;">{{ buttonText }}</span> +
		</button>
    </div>
</template>

<script lang="ts" setup>

import type { PathItem } from '../types/path';

const props = defineProps<{
	showButton: boolean,
    buttonText: string,
    currentPath: PathItem[]
}>();

const emit = defineEmits<{
    (e: 'click'): void
}>();

</script>

<style lang="scss" scoped>
.top {
	padding: 0px 10px;
	margin-bottom: 10px;
	display: flex;
	align-items: center;
	height: min-content;
	gap: 10px;

	.path {
        display: flex;
        gap: 10px;
		width: max-content
	}

	hr {
		flex: 1 1 auto;
	}

	a {
		color: var(--color);
		background: none;
		font-weight: 100;
		font-size: 14px;
		text-decoration: none;
		transition: color 200ms;

		&:hover {
			color: var(--color-dim);
		}
	}

	button {
		cursor: pointer;
		display: flex;
        color: var(--color);
        background-color: transparent;
		border: 1px solid transparent;
		align-items: center;
		gap: 7px;
		font-size: 24px;
		padding: 0 7px;
		border-radius: 5px !important;
        transition: border-color 200ms, background-color 200ms;

        &:hover {
            border-color: var(--border-color);
        }

        &:active {
            border-color: var(--border-active-color);
            background-color: var(--btn-background-color) !important;
        }
	}
}
</style>