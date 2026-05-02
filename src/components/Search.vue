<template>
    <div class="search">
        <input type="text" placeholder="Search" @keydown.enter="emit('submit')" />
    </div>
</template>

<script lang="ts" setup>

const emit = defineEmits(['submit']);

</script>

<style lang="scss" scoped>

.search {
    border: 1px solid var(--border-color);
    border-radius: 5px;
    padding: 5px 10px;
    width: 100%;

    input[type="text"] {
        background: none;
        border: none;
        width: 100%;
        font-size: 13px;
        color: var(--color);

        &:focus {
            outline: none;
        }
    }
}

</style>