<template>
	<RouteredHeader 
		@click="openModal" 
		button-text="Add Category" 
		:show-button="canManageData()"
		:current-path="currentPath"
	/>

	<div class="categories-list-wrapper">
		<div
			v-if="categoryStore.categories.length == 0"
			v-for="n in 3"
			:key="n"
			class="category block-style ghost"
		>
			<div class="cover-replacer"></div>
			<div class="info-block">
			<div class="name"></div>
			<div class="description"></div>
			<div class="link-block"><hr></div>
			</div>
		</div>
		<div
			v-else
			v-for="category in categoryStore.categories" 
			:key="category.id" 
			class="category block-style"
		>
			<div v-if="category.cover" class="cover"></div>

			<div v-else class="cover-replacer">
				{{ category.name?.[0] }}
			</div>

			<div class="info-block">
				<div class="name">{{ category.name }}</div>

				<!-- <div class="block-name">
					Latest topics tags
				</div>

				<div class="tags">
				</div> -->

				<div class="description">
					{{ category.description }}
				</div>

				<GotoLink :linkTo="`/categories/${category.id}`" />
			</div>
		</div>
	</div>

	<Modal ref="modalRef" v-if="showCreateCategory" width="40%" height="max-content" padding-set="0" opacity-speed="0.2s">
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

			<div class="err-msg" v-show="errorMessageShow">
				<ErrorMessage ref="errMsg" />
			</div>

			<div class="button-block">
				<button class="button-style" @click="closeModal">Cancel</button>
				<button class="button-style focus" @click="submit">Submit</button>
			</div>
		</div>
	</Modal>
</template>

<script lang="ts" setup>

import { onMounted } from 'vue';
import { useCategoryStore } from '../storage/category';
import Modal from '../components/Modal.vue';
import InputSingle from '../components/InputSingle.vue';
import Textarea from '../components/Textarea.vue';
import ErrorMessage from '../components/ErrorMessage.vue';
import { useUiStore } from '../storage/ui';
import { nextTick, ref } from 'vue';
import { createCategory } from '../api/category';
import { onBeforeRouteLeave } from 'vue-router';
import RouteredHeader from '../components/RouteredHeader.vue';
import { canManageData } from '../scripts/user';
import GotoLink from '../components/GotoLink.vue';

const categoryStore = useCategoryStore();
const uiStore = useUiStore();
const title = ref<string>('');
const desc = ref<string>('');
const showCreateCategory = ref(false);
const errorMessageShow = ref(false);
import { notificationController } from '../scripts/notificationController';
const catRef = ref<InstanceType<typeof InputSingle> | null>(null);
const errMsg = ref<InstanceType<typeof ErrorMessage> | null>(null);
const modalRef = ref<InstanceType<typeof Modal> | null>(null);

const currentPath = [
	{
		to: "/categories",
		label: "Categories"
	}
]

function openModal() {
	showCreateCategory.value = true;
}

onMounted(async () => {
	categoryStore.load();
});

uiStore.titleExtend = "Categories";

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
		const res = await createCategory(title.value, desc.value);

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

		if (err.status === 409) {
			errorMessageShow.value = true;

			nextTick();

			errMsg.value?.changeVisibility(true);
			errMsg.value?.setMessage("Category exists");
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

<style lang="scss" scoped>

.categories-list-wrapper {
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
	width: 100%;
	justify-content: center;
	align-items: center;
}

.category {
	height: 250px;
	user-select: none;
	overflow: hidden;
	width: 500px;
	display: flex;

	&.ghost {
		pointer-events: none;
		opacity: 0.5;
		overflow: hidden;
		position: relative;

		.cover-replacer, .name, .description, .link-block hr {
			background-color: var(--background-color);
			border-radius: 4px;
			color: transparent;
			position: relative;
			overflow: hidden;
		}

		.info-block {
			width: 60%;
			display: flex;
			flex-direction: column;
			gap: 10px;
		}

		.name {
			height: 24px;
			width: 50%;
		}

		.description {
			height: 60px;
			width: 100%;
		}

		.link-block hr {
			height: 1px;
			width: 100%;
		}

		.cover-replacer::before, .name::before, .description::before, .link-block hr::before {
			content: '';
			position: absolute;
			top: 0;
			left: -200%;
			width: 200%;
			height: 100%;
			background: linear-gradient(
				90deg, transparent,
				var(--loading-color), transparent
			);
			animation: slide 1.2s infinite;
		}
	}

	.cover-replacer {
		width: 230px;
		display: flex;
		justify-content: center;
		font-size: 72px;
		align-items: center;
		padding: 15px;
		background-color: var(--background-color);
	}

	.block-name {
		color: var(--color-dim);
		font-size: 12px;
	}

	.tags {
		padding: 6px 0px 10px 0px;
		display: flex;
		gap: 10px;

		.tag {
			font-size: 11px;
			padding: 0px 6px;
			border: 1px solid transparent;
			border-radius: 10px;

			&.blue {
				background-color: rgba(91, 91, 199, 0.358);
				border-color: rgb(75, 75, 224);
			}

			&.green {
				background-color: rgba(60, 180, 95, 0.32);
				border-color: rgb(60, 180, 95);
			}

			&.orange {
				background-color: rgba(220, 140, 40, 0.4);
				border-color: rgb(220, 140, 40);
			}

			&.red {
				background-color: rgba(210, 90, 90, 0.32);
				border-color: rgb(200, 70, 70);
			}
		}
	}

	.info-block {
		display: flex;
		flex-direction: column;
		padding: 15px;
		width: 270px;

		.name {
			font-size: 24px;
			font-weight: 500;
		}

		.description {
			flex: 1 1 auto;
			font-size: 16px;
		}
	}
}

@keyframes slide {
	0% {
		left: -200%;
	}
	100% {
		left: 100%;
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
			font-size: 13px;
		}
	}
}
</style>