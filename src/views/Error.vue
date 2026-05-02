<template>
	<div class="err-block">
		<div class="text-block">
			<h1>{{ currentError!.title }}</h1>
			<p>{{ currentError!.description }}</p>
			<router-link class="button-style" to="/">Return Home</router-link>
		</div>

		<img src="/icons/error.png" alt="{{ currentError!.title }}" class="icon">
	</div>
</template>

<script lang="ts" setup>

import { useUiStore } from '../storage/ui';
import { useRoute } from 'vue-router';

type ErrorPage = {
	title: string;
	description: string;
}

const errorPages: Record<string, ErrorPage> = {
	"403": {
		title: "Forbidden",
		description: "You are not authorized nor allowed to access this page"
	},
	"404": {
		title: "Not Found",
		description: "The page you are looking for doesn't exist or has been moved"
	},
	"undefined": {
		title: "Error",
		description: "An unexpected error has occurred"
	}
}

const uiStore = useUiStore();
const route = useRoute();
let errorId = route.params.id?.toString();

if (errorId === undefined) {
	errorId = "undefined";
}

if (errorPages[errorId] === undefined) {
	errorId = "undefined";
}

const currentError = errorPages[errorId];

uiStore.titleExtend = currentError!.title;

</script>

<style lang="scss" scoped>

.err-block {
	position: absolute;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;

	.text-block {
		width: 65%;
		color: var(--color);
	}

	img {
		width: 250px
	}

	h1 {
		margin: 0;
		padding: 0;
		font-size: 70px;
	}

	p {
		color: var(--color-dim);
		margin: 0 0 30px 0;
		padding: 0;
		font-weight: 500;
	}

	a {
		text-decoration: none;
		padding: 12px 15px;

		img {
			height: 25px;
			filter: invert(1);
			display: inline-block;
			transform-origin: center center;
			transition: transform 400ms ease;
		}
	}
}

</style>