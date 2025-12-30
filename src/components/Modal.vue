<template>
    <div class="subblur">
        <div
            class="modal-background-block"
            :style="{
                width: animatedWidth + measureWidth,
                height: animatedHeight + measureHeight,
                maxWidth: maxWidth + measureMaxWidth,
                maxHeight: maxHeight + measureMaxHeight,
                padding: localPadding
            }"
        >
            <div
                class="slot-wrapper"
                :style="{ opacity: opacitySet, transition: 'opacity 0.3s ease' }"
            >
                <slot></slot>
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
		measureMaxHeight?: 'px' | '%';
		measureMaxWidth?: 'px' | '%';
		width: number;
		height: number;
		maxWidth?: number;
		maxHeight?: number;
		paddingSet?: string;
	}>(),
	{
		paddingSet: '20px',
		maxWidth: 800,
		maxHeight: 600,
		measureMaxHeight: 'px',
		measureMaxWidth: 'px'
	}
);

const localPadding = ref(props.paddingSet);
const animatedWidth = ref(0);
const animatedHeight = ref(0);
const opacitySet = ref(0);

onMounted(() => {
	setTimeout(() => {
		animatedWidth.value = props.width;
		animatedHeight.value = props.height;
	}, 50);

	setTimeout(() => {
		opacitySet.value = 1;
	}, 450);
});

const closeModal = async () => {
	opacitySet.value = 0;

	await new Promise(resolve => setTimeout(resolve, 300));

	localPadding.value = "0";
	animatedWidth.value = 0;
	animatedHeight.value = 0;

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
	align-items: center
	background: rgba(0, 0, 0, 0.4)
	backdrop-filter: blur(5px)
	z-index: 1000

.modal-background-block
	background-color: rgba(35, 35, 35, 0.7)
	border: 1px solid rgba(255, 255, 255, 0.105)
	box-shadow: 0 1px 10px rgba(135, 135, 135, 0.1)
	border-radius: 5px
	display: flex
	flex-direction: column
	align-items: center
	justify-content: center
	gap: 20px
	width: auto
	height: auto
	transition: width 0.3s, height 0.3s, padding 0.3s

.slot-wrapper
	overflow: scroll
	display: flex
	flex-direction: column
	align-items: center
	justify-content: center
	width: 100%
	height: 100%
	gap: 20px

@media (max-width: 800px)
	.modal-background-block
		width: 90% !important
		height: 80% !important
		max-width: 90% !important
		max-height: 555px !important
</style>