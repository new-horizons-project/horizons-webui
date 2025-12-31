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
					→ {{ path.label }}
				</router-link>
			</div>
			<hr>
			<button><span style="font-size: 14px;">New</span> +</button>
		</div>
		<router-view />
	</div>
</template>

<script lang="ts" setup>

let currentPath: Record<string, string>[];

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
		color: rgb(188, 188, 188);
		background: var(--);
		font-weight: 100;
		font-size: 14px;
		text-decoration: none;
		transition: color 200ms;

		&:hover {
			color: rgb(214, 214, 214);
		}
	}

	button {
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 7px;
		font-size: 24px;
		border: none;
		padding: -2px 5px;
		background-color: transparent;
		border-radius: 5px !important;
		transition: color 100ms;

		&:hover {
			color: rgb(125, 209, 125);
		}

		&:active {
			color: rgb(158, 235, 158);
		}
	}
}
</style>