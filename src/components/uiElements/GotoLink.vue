<template>
<div class="link-block">
    <slot />
    <hr>
    <router-link 
        class="button-style" 
        :to="linkTo"
    >
        Goto
    </router-link>
</div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    linkTo: string;
}>();
</script>

<style lang="scss" scoped>
.link-block {
    padding-top: 7px;
    width: 100%;
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;

    a {
        padding: 1px 10px;
        color: var(--color);
        text-decoration: none;
    }

    hr {
        flex: 1 1 auto;
    }
}
</style>