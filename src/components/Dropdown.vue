<template>
    <div class="dropdown block-style">
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>

import { ref } from 'vue';

const open = ref(false);

function changeVisibility(visible: boolean) {
    open.value = visible;
}

defineExpose({ changeVisibility });

</script>

<style lang="scss">
.dropdown {
	opacity: 0;
	display: flex;
	pointer-events: none;
	flex-direction: column;
    width: 100%;
	transition: opacity 200ms !important;

	&.active {
		pointer-events: initial;
		opacity: 1;
	}

	.username {
		padding: 10px;
		display: flex;
		width: fit-content;
		align-items: center;
		gap: 10px;
	}
	
	.dropdown-buttons-block {
		padding: 10px;
		display: flex;
		gap: 10px;
		flex-direction: column;

		&.alter {
			font-size: 14px;
			font-weight: 400;
			width: 100%;
			justify-content: center;
			align-items: center;
			box-sizing: border-box;
			flex-direction: row !important;

			hr {
				flex: 1 1 auto;
			}
		}

		a {
			transition: color 200ms, background-color 200ms;
			display: flex;
			align-items: center;
			font-size: 15px;
			gap: 10px;
			padding: 4px 8px;

			img {
				width: 20px !important;
				height: 20px !important;

				&:hover {
					filter: var(--icon-filter);
				}
			}

			&:hover {
				color: var(--color-dim)
			}
		}

		button {
			text-align: start;
			padding: 4px 8px;
			font-size: 14px;
			font-weight: 500;
			cursor: pointer;
			transition: background-color 200ms;
		}
	}

	hr {
		min-height: 0;
		min-width: 0;
		padding: 0;
		margin: 0;
		height: 1px;
		border: none;
		border-bottom: 1px solid var(--border-color);
	}
}
</style>