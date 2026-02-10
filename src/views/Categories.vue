<template>
	<div class="categories-wrapper">
		<div class="top">
			<div class="path">
				<router-link to="/categories">Categories</router-link>
				<router-link
					v-for="path in currentPath"
					:key="path.to"
					:to="'/categories' + path.to"
					class="link"
					ref="items"
				>
					{{ path.label }}
				</router-link>
			</div>
			<hr>
			<button class="button-style" @click="openModal"><span style="font-size: 14px;">Add Category</span> +</button>
		</div>
		<router-view />
		<Modal ref="modalRef" v-if="showCreateCategory" :width=30 :height=40 measure-width="%" measure-height="%"
		padding-set="0" opacity-speed="0.2s">
			<div class="modal-wrapper">
				<div class="header">
					<h2>New Category</h2>
					<button class="close" @click="closeModal">
						<img src="/icons/close.png" class="icon">
					</button>
				</div>
			</div>
		</Modal>
	</div>
</template>

<script lang="ts" setup>

import Modal from '../components/Modal.vue';
import { ref } from 'vue';

let currentPath: Record<string, string>[];

const showCreateCategory = ref(false);
const modalRef = ref<InstanceType<typeof Modal> | null>(null);

function openModal() {
	showCreateCategory.value = true;
}

async function closeModal() {
	await modalRef.value?.closeModal();

	setTimeout(() => {
		showCreateCategory.value = false;
	}, 100);
}

</script>

<style lang="scss">
.categories-wrapper {
	display: flex;
	flex-direction: column;
	width: 90%;
}

.top {
	padding: 0px 10px;
	margin-bottom: 10px;
	display: flex;
	align-items: center;
	height: min-content;
	gap: 10px;

	.path {
		width: max-content
	}

	hr {
		flex: 1 1 auto;
		min-height: 0;
		min-width: 0;
		padding: 0;
		margin: 0;
		height: 1px;
		border: none;
		border-bottom: 2px solid var(--border-color);
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
		border: 1px solid transparent;
		align-items: center;
		gap: 7px;
		font-size: 24px;
		padding: 0 7px;
		background-color: transparent;
		border-radius: 5px !important;
	}
}

.modal-wrapper {
	display: flex;
	flex-direction: column;

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 2px 10px;
		border-bottom: 1px solid var(--border-color);
		
		.close {
			cursor: pointer;
			margin-right: 5px;
			background: none;
			border: none;
			height: 20px;
			width: 20px;

			img {
				width: 20px;
				height: 20px;
				transition: transform 200ms, filter 200ms;

				&:hover {
					transform: rotate(90deg);
				}

				&:active {
					filter: invert(var(--icon-hover-filter));
				}
			}
		}

		h2 {
			padding: 0;
			margin: 0;
			padding: 5px 0;
		}
	}
}
</style>