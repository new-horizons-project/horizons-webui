<template>
	<div class="err-block">
		<div class="text-block">
			<h1>Ooops!</h1>
			<p>The page you are looking for doesn't exist or has been moved</p>
			<router-link to="/">Return Home</router-link>
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
		color: white;
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
		color: rgb(202, 202, 202);
		margin: 0 0 30px 0;
		padding: 0;
		font-weight: 500;
	}

	a {
		width: max-content;
		color: rgb(255, 255, 255);
		background-color: rgb(49, 49, 49);
		border-radius: 10px;
		padding: 12px 15px;
		display: flex;
		text-decoration: none;

		img {
			height: 25px;
			filter: invert(1);
			display: inline-block;
			transform-origin: center center;
			transition: transform 400ms ease;
		}

		&:hover {
        	background-color: rgb(60, 60, 60);
		}

		&:hover > img {
			transform: rotate(90deg);
		}

		&:active {
        	background-color: rgb(65, 65, 65);
			transform: translateY(1px);
		}
	}
}

</style>