<template>
	<div class="categories-wrapper">
		<router-view />
	</div>
</template>

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
</style>