<template>
	<div class="err-block">
		<div class="text-block">
			<h1>Ooops!</h1>
			<p>The page you are looking for doesn't exist or has been moved</p>
			<router-link class="button-style" to="/">Return Home</router-link>
		</div>

		<img src="/icons/404.png" alt="404" class="icon">
	</div>
</template>

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