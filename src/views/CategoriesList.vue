<template>
	<div class="categories-list-wrapper">
		<div
			v-if="categoryStore.categories.length == 0 || true"
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

				<div class="link-block">
					<hr>
					<router-link 
						class="button-style" 
						:to="`/categories/${category.id}`"
					>
						Goto
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>

import { onMounted } from 'vue';
import { useCategoryStore } from '../storage/category';

const categoryStore = useCategoryStore();

onMounted(async () => {
	categoryStore.load();
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
		width: 45%;
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
		width: 60%;

		.name {
			font-size: 24px;
			font-weight: 500;
		}

		.description {
			flex: 1 1 auto;
			font-size: 16px;
		}

		.link-block {
			padding-top: 7px;
			width: 100%;
			display: flex;
			gap: 10px;
			justify-content: center;
			align-items: center;

			a {
				padding: 1px 10px;
				color: var(--color);
				text-decoration: none;
			}

			hr {
				flex: 1 1 auto;
				min-height: 0;
				min-width: 0;
				padding: 0;
				margin: 0;
				height: 1px;
				border: none;
				border-bottom: 1px solid var(--border-color);
			}
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
</style>