<template>
	<div class="categories-list-wrapper">
		<div class="category block-style">
			<div v-if="false" class="cover ">
			</div>

			<div v-else class="cover-replacer">
				L
			</div>

			<div class="info-block">
				<div class="name">Lorem ipsum</div>

				<div class="block-name">
					Latest topics tags
				</div>

				<div class="tags">
					<div class="tag orange">#tag-4</div>
				</div>

				<div class="description">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>

				<div class="link-block">
					<hr>
					<router-link class="button-style" to="/categories/1">Goto</router-link>
				</div>
			</div>
		</div>

		<div class="category block-style">
			<div v-if="false" class="cover ">
			</div>

			<div v-else class="cover-replacer">
				L
			</div>

			<div class="info-block">
				<div class="name">Lorem ipsum</div>

				<div class="block-name">
					Latest topics tags
				</div>

				<div class="tags">
					<div class="tag red">#tag-1</div>
					<div class="tag green">#tag-2</div>
					<div class="tag blue">#tag-3</div>
				</div>

				<div class="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit, amet consectetur adipisicing elit.</div>

				<div class="link-block">
					<hr>
					<router-link class="button-style" to="/categories/1">Goto</router-link>
				</div>
			</div>
		</div>
		
	</div>
</template>

<style lang="scss">

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
		color: grey;
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
				background-color: rgba(91, 199, 120, 0.32);
				border-color: rgb(60, 180, 95);
			}

			&.orange {
				background-color: rgba(230, 160, 70, 0.32);
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
				color: white;
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
</style>