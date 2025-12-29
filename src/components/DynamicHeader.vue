<template>
	<div class="wrapper">
		<div class="header">
			<div class="logo">
				<img src="http://127.0.0.1:8000/static/1?size=thumbnail" alt="">
			</div>

			<div class="links">
				<a href="/" class="underline">Home</a>
				<a href="/">News</a>
				<a href="/">Pinned 1</a>
				<a href="/">Pinned 2</a>
				<a href="/">Pinned 3</a>
				<a href="/">Communities</a>
				<a href="/">Search</a>
			</div>

			<div class="buttons-block">
				<div class="system-configuration">
					<img src="/icons/gear.png" alt="">
				</div>

				<div class="user">
					<img src="/icons/avatar.jpg" alt="">

					ElCapitan
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.wrapper {
	width: 100%;
	height: min-content;
	display: flex;
	justify-content: center;
	align-items: center;
}

.header {
    overflow: hidden;
	padding: 5px;
    margin: 10px;
    font-size: 16px;
    width: 75%;
    display: flex;
	font-weight: 600;
    gap: 25px;
    border-radius: 15px;
	align-items: center;
    backdrop-filter: blur(12px);
    background-color: rgba(35, 35, 35, 0.35);
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
	transition: all 600ms;
	user-select: none;

	&.compact {
		cursor: pointer;
		margin: 5px;
		width: max-content;
		max-width: 400px;
		padding: 2px 10px;
		font-size: 14px;
	}

	.header * {
		transition: all 600ms;
	}

	.logo {
		padding: 3px 10px;
		background-color: rgb(49, 49, 49);
		border-radius: 10px;
		transition: all 600ms;

		img {
			height: 35px;
		}
    }

	&.pinned > .logo {
		padding: 1px 8px 2px 8px;
		border-top-left-radius: 0;
		border-top-right-radius: 0;

		img {
			height: 30px;
		}
	}

    .links {
        display: flex;
        gap: 25px;
    }

	.buttons-block {
		right: 5px;
		position: absolute;
		display: flex;
		gap: 5px;
	}

    .user {
		cursor: pointer;
        color: rgb(220, 220, 220);
        background-color: rgb(49, 49, 49);
        border-radius: 10px;
        padding: 6px 10px;
		gap: 10px;
        display: flex;
		align-items: center;
		transition: background-color 200ms;

		img {
			height: 35px;
			border-radius: 50%;
		}

		&:hover {
        	background-color: rgb(60, 60, 60);
		}

		&:active {
        	background-color: rgb(65, 65, 65);
			transform: translateY(1px);
		}
    }

	.system-configuration {
		cursor: pointer;
		right: 150px;
		color: rgb(220, 220, 220);
		background-color: rgb(49, 49, 49);
		border-radius: 10px;
		padding: 11px 10px;
		gap: 10px;
		display: flex;

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

	&.pinned > .buttons-block .user {
        padding: 5px 10px;	
		border-top-left-radius: 0;
		border-top-right-radius: 0;

		img {
			height: 25px;
		}

		&:active {
			transform: translateY(-1px);
		}
	}

	&.pinned > .buttons-block .system-configuration {
        padding: 7px 10px;	
		border-top-left-radius: 0;
		border-top-right-radius: 0;

		&:active {
        	background-color: rgb(65, 65, 65);
			transform: translateY(-1px);
		}
	}

	&.pinned {
    	padding: 0px 0px 5px 5px;
		margin: 0;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
		border-top: none;
	}

	.hidden {
		opacity: 0;
		width: 0;
		padding: 0;
		margin: 0;
		overflow: hidden;
	}
}

a {
    text-decoration: none;
	color: white;
	transition: color 200ms;

	&.underline {
		border-bottom: 2px solid white;
	}

	&:hover {
		color: rgb(197, 197, 197);
		border-bottom-color: rgb(197, 197, 197);
	}
}
</style>