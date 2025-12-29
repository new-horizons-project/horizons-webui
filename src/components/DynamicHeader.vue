<template>
	<div 
		class="wrapper"
		@mouseenter="handleMouseStart"
		@mouseleave="handleMouseEnd"
		@mousedown="handleMouseDown"
		@mouseup="handleMouseUp"
	>
		<div 
			class="header" 

		    :class="{ 
				pinned: displayState() === State.Pinned,
				compact: isCompact
			}
		">
			<div v-if="!isCompact" class="logo">
				<img src="http://127.0.0.1:8000/static/1?size=thumbnail" alt="">
			</div>

			<div v-if="!isCompact" class="links">
				<a href="/" class="underline">Home</a>
				<a href="/">Latest</a>
				<a href="/">Search</a>
				<a href="/">My</a>
			</div>

			<div v-if="!isCompact" class="user">
				ElCapitan
			</div>

			<div v-else class="compact-data">
				Information > Lorem ipsum
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const State = {
  Island: 'Island',
  Pinned: 'Pinned',
} as const;

type State_t = typeof State[keyof typeof State];

const state = ref<State_t>(State.Island);
const isCompact = ref(false);

let holdTimeout: number | null = null;
let compactHovered = false;
let lastEventCompact = false;

function handleMouseStart() {
	if (isCompact.value) {
		compactHovered = true;
	}
}

function handleMouseEnd() {
	if (compactHovered) {
		compactHovered = false;
	}
}

function handleMouseDown() {
	holdTimeout = window.setTimeout(() => {
		isCompact.value = !isCompact.value;
		lastEventCompact = true;
	}, 500);
}

function handleMouseUp() {
	if (!holdTimeout) {
		return;
	}

	if (lastEventCompact) {
		lastEventCompact = false;
		return;
	}

	clearTimeout(holdTimeout);
	holdTimeout = null;

	if (!isCompact.value) {
		state.value = state.value === State.Island ? State.Pinned : State.Island;
	}
}

const displayState = () => {
  if (isCompact.value) {
    return compactHovered ? State.Island : null;
  }

  return state.value;
};

</script>

<style lang="scss" scoped>
.wrapper {
	width: 100%;
	height: fit-content;
	display: flex;
	justify-content: center;
	align-items: center;
}

.header {
    position: relative;
    overflow: hidden;
    margin: 10px;
    padding: 15px;
    font-size: 16px;
    width: 60%;
    display: flex;
    align-items: center;
	font-weight: 600;
    gap: 10px;
    border-radius: 15px;
	justify-content: center;
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
		position: absolute;
        top: 5px;
        left: 5px;

		img {
			height: 35px;
			padding: 5px 15px;
			background-color: rgb(49, 49, 49);
			border-radius: 10px;
		}
    }

	&.pinned > .logo {
		top: 0;
		left: 4px;
		
		img {
			height: 35px;
			padding: 2px 15px;
			border-top-left-radius: 0;
			border-top-right-radius: 0;
		}
	}

    .links {
        display: flex;
        justify-content: center;
        width: 60%;
        gap: 30px;
    }

    .user {
        position: absolute;
        top: 5px;
        right: 5px;
        color: rgb(220, 220, 220);
        background-color: rgb(49, 49, 49);
        border-radius: 10px;
        padding: 11px 35px;
        display: flex;
        justify-content: end;
    }

	&.pinned > .user {
		top: 0;
		right: 4px;
        padding: 7px 35px;		
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	}

    &::after {
        content: '';
        position: absolute;
        width: 180%;
        aspect-ratio: 1;
        left: 50%;
        top: 50%;
        background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.03) 0%,
            rgba(255, 255, 255, 0.015) 40%,
            transparent 70%
        );
        border-radius: 50%;
        pointer-events: none;
        opacity: 0;
    }

    &:active::after {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
        transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1),
            opacity 0.3s ease;
    }

	&.pinned {
    	padding: 8px 15px;
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