<template>
    <div class="top">
        <div class="path">
            <router-link
                v-for="(path, index) in currentPath"
                :key="path.to"
                :to="path.to"
                class="link"
            >
                {{ path.label }}
                
                <span v-if="index < currentPath.length - 1"> → </span>
            </router-link>
        </div>
        <hr>
        <button class="button-style" v-if="showButton" @click="emit('click')"><span style="font-size: 14px;">{{ buttonText }}</span> +</button>
    </div>
</template>

<script lang="ts" setup>

import type { PathItem } from '../types/path';

const props = defineProps<{
	showButton: boolean,
    buttonText: string,
    currentPath: PathItem[]
}>();

const emit = defineEmits<{
    (e: 'click'): void
}>();

</script>

<style lang="scss" scoped>

</style>