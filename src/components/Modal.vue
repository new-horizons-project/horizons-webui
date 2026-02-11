<template>
    <div class="subblur" :style="{ opacity: opacitySet, transition: 'opacity 0.3s ease' }">
        <div
            class="modal-background-block"
            :style="{
                minWidth: width + measureWidth,
                minHeight: height + measureHeight,
                padding: localPadding,
            }"
        >
            <div class="slot-wrapper">
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = withDefaults(
	defineProps<{
		measureHeight: 'px' | '%';
		measureWidth: 'px' | '%';
		width: number;
		height: number;
		paddingSet?: string;
	}>(),
	{
		paddingSet: '20px',
	}
);

const localPadding = ref(props.paddingSet);
const opacitySet = ref(0);

onMounted(() => {
	setTimeout(() => {
		opacitySet.value = 1;
	}, 10);
});

const closeModal = async () => {
	opacitySet.value = 0;
	await new Promise(resolve => setTimeout(resolve, 300));
};

defineExpose({ closeModal });

</script>

<style scoped lang="sass">
.subblur
	position: absolute
	top: 0
	inset: 0
	display: flex
	justify-content: center
	width: auto
	height: auto
	align-items: center
	background: var(--blur-background)
	backdrop-filter: blur(5px)
	z-index: 1000

.modal-background-block
	background-color: var(--background-color-main)
	border: 1px solid var(--border-color)
	border-radius: 15px
	display: flex
	flex-direction: column
	align-items: center
	justify-content: center
	gap: 20px
	width: auto
	height: auto
	max-height: calc(100dvh - 40px)
	max-width: calc(100dvw - 40px)
	overflow: hidden
	transition: max-width 0.3s ease, max-height 0.3s ease, padding 0.3s ease
	box-sizing: border-box
	box-shadow: 0 4px 10px var(--box-shadow)

.slot-wrapper
	display: flex
	flex: 1 1 auto
	flex-direction: column
	width: 100%
	gap: 20px

@media (max-width: 800px)
	.modal-background-block
		width: 90% !important
		height: 80% !important
		max-width: 90% !important
		max-height: 555px !important
</style>