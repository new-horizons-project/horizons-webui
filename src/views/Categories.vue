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
			<button class="button-style" v-if="canCreateCateg()" @click="openModal"><span style="font-size: 14px;">Add Category</span> +</button>
		</div>

		<router-view />

		<Modal ref="modalRef" v-if="showCreateCategory" width="30%" height="max-content" padding-set="0" opacity-speed="0.2s">
			<div class="modal-wrapper">
				<div class="header">
					<h2>New Category</h2>
					<button class="close" @click="closeModal">
						<img src="/icons/close.png" class="icon">
					</button>
				</div>
				<div class="input-wrapper">
					<div class="input">
						<InputSingle ref="catRef" :small="true" type="text" text="Category title" v-model="title" />
					</div>
					<div class="input">
						<Textarea :small="true" type="text" text="Description" v-model="desc" />
					</div>
				</div>

				<hr class="width-100">

				<div class="input-wrapper flex-start">
					<div class="select-wrapper">
						<div class="title">Display mode</div>
						<select v-model="select">
							<option value="Standard" selected>Standard</option>
							<option value="Wiki">Wiki</option>
						</select>
					</div>
				</div>

				<hr class="width-100">

				<div class="err-msg" v-show="errorMessageShow">
					<ErrorMessage ref="errMsg" />
				</div>

				<div class="button-block">
					<button class="button-style" @click="closeModal">Cancel</button>
					<button class="button-style focus" @click="submit">Submit</button>
				</div>
			</div>
		</Modal>
	</div>
</template>

<script lang="ts" setup>

import Modal from '../components/Modal.vue';
import InputSingle from '../components/InputSingle.vue';
import Textarea from '../components/Textarea.vue';
import ErrorMessage from '../components/ErrorMessage.vue';
import { useAuthStore } from '../storage/auth';
import { useUiStore } from '../storage/ui';
import { nextTick, ref } from 'vue';
import { createCategory } from '../api/category';
import { onBeforeRouteLeave } from 'vue-router';
import { useCategoryStore } from '../storage/category';

let currentPath: Record<string, string>[];

const title = ref<string>('');
const desc = ref<string>('');
const select = ref<string>('Standard');
const categoryStore = useCategoryStore();
const authStore = useAuthStore();
const uiStore = useUiStore();
const showCreateCategory = ref(false);
const errorMessageShow = ref(false);
import { notificationController } from '../scripts/notificationController';
const catRef = ref<InstanceType<typeof InputSingle> | null>(null);
const errMsg = ref<InstanceType<typeof ErrorMessage> | null>(null);
const modalRef = ref<InstanceType<typeof Modal> | null>(null);

uiStore.titleExtend = "Categories";

function openModal() {
	showCreateCategory.value = true;
}

function canCreateCateg() {
	const role = authStore.user?.role
	return role !== undefined && ["admin", "moderator"].includes(role)
}

async function closeModal() {
	await modalRef.value?.closeModal();

	setTimeout(() => {
		showCreateCategory.value = false;
	}, 100);

	desc.value = "";
	title.value = "";
	errMsg.value?.changeVisibility(false);
	errorMessageShow.value = false;
}

async function submit() {
	if (title.value === '') {
		nextTick();
		catRef.value?.setError(true);
		return;
	}

	try {
		const res = await createCategory(title.value, desc.value, select.value);

		if (res.status === 200) {
			closeModal();
			categoryStore.load();
			
			notificationController.createNotification(
				"Info",
				`Category "${title.value}" created successfully!`,
				"",
				"info"
			);
			return;
        }
	} catch (err: any) {
        if (err.status === 401 || err.status === 403) {
			errorMessageShow.value = true;

			nextTick();

			errMsg.value?.changeVisibility(true);
			errMsg.value?.setMessage("Insufficient privileges. Unable create category");
            return false;
        }

		if (err.status === 422 || err.status === 405 || err.status === 404) {
			errorMessageShow.value = true;
			nextTick();
			errMsg.value?.changeVisibility(true);
			errMsg.value?.setMessage(`Unexpected error ${err.status}. Contact adminstrator`);
		}
	}
}

onBeforeRouteLeave(() => {
	categoryStore.unload();
});

</script>

<style lang="scss">
.categories-wrapper {
	display: flex;
	flex-direction: column;
	width: 90%;
	height: 100%;
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
	box-sizing: border-box;

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 2px 15px;
		background-color: var(--background-root);
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

	.input-wrapper {
		display: flex;
		flex-direction: column;
		padding: 15px;
		align-items: center;
		box-sizing: border-box;
		gap: 15px;

		&.flex-start {
			align-items: flex-start;
		}

		.input {
			width: 100%;
			box-sizing: border-box;
		}

		.select-wrapper {
			width: 100%;
			display: flex;
			position: relative;

			.title {
				width: fit-content;
				display: flex;
				align-items: center;
				text-align: center;
				font-size: 14px;
				border: 1px solid var(--border-color);
				border-top-left-radius: 10px;
				border-bottom-left-radius: 10px;
				padding: 5px 10px;
				background-color: var(--background-color);
			}

			select {
				cursor: pointer;
				flex: 1 1 auto;
				width: auto;
				border: 1px solid var(--border-color);
				border-left: none !important;
				background-color: transparent;
				appearance: none;
				-webkit-appearance: none;
				-moz-appearance: none;
				border-radius: 10px;
				border-top-left-radius: 0 !important;
				border-bottom-left-radius: 0 !important;
				padding: 10px;
				color: var(--color);
				box-sizing: border-box;
				display: flex;
				transition: background-color 200ms;

				&:hover {
					background-color: var(--background-color) !important;
				}
			}

			&::after {
				content: "⌄";
				font-size: 20px;
				position: absolute;
				right: 9px;
				top: 40%;
				transform: translateY(-50%);
				pointer-events: none;
				color: var(--color);
			}
		}
	}

	.err-msg {
		padding: 15px 15px 0 15px;
	}

	.button-block {
		box-sizing: border-box;
		display: flex;
		padding: 15px;
		width: 100%;
		justify-content: center;margin-top: auto;
		align-items: center;
		gap: 10px;

		button {
			padding: 10px 20px;
			cursor: pointer;
			font-weight: 500;
		}
	}
}
</style>