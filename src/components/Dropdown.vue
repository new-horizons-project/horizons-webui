<template>
    <div class="dropdown block-style" :class="{ active: open, opacity: opacity }">
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>

import { ref } from 'vue';

const open = ref(false);
const opacity = ref(false);

function changeVisibility(visible: boolean) {
	if (visible) {
		open.value = true;
		
		setTimeout(() => {
			opacity.value = true;
		}, 5);
		
		return;
	}

	opacity.value = false;

	setTimeout(() => {
		open.value = false;
	}, 200);
}

defineExpose({ changeVisibility });

</script>

<style lang="scss">
.dropdown {
	opacity: 0;
	display: none;
	pointer-events: none;
	flex-direction: column;
    width: 100%;
	transition: opacity 200ms !important;

	&.active {
		display: flex;
		pointer-events: initial;
	}

	&.opacity {
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
}
</style>