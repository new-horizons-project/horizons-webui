<template>
    <div class="section-wrapper">
        <div class="name" :class="nameStyle">{{ name }}</div>
        <hr>
        <slot />
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{
    name: string;
    nameStyle: 'greyed' | 'default';
}>();

</script>

<style lang="scss" scoped>

.section-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 10px;

    .name {
        &.greyed {
            font-size: 12px;
            color: var(--color-dim);
        }

        &.default {
            font-size: 14px;
            font-weight: 500;
        }
    }

    hr {
        flex: 1 1 auto;
    }
}

</style>