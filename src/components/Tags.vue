<template>
    <div class="tags">
        <div 
            v-for="tag in tags" 
            :key="tag.id" 
            class="tag"
            :style="{
                backgroundColor: 
                    tag.getColorStrings().backgroundColorString,
                borderColor: 
                    tag.getColorStrings().borderColorString
            }"

            :class="{
                bigger: bigger
            }"
        >
            {{ tag.name }}
        </div>
    </div>
</template>

<script setup lang="ts">

import { Tag } from '../types/tags';

const props = withDefaults(defineProps<{
    tags: Tag[],
    bigger: boolean
}>(), {
    bigger: false
});

</script>


<style lang="scss" scoped>
.tags {
    display: flex;
    gap: 10px;

    .tag {
        font-size: 11px;
        padding: 0px 6px;
        border: 1px solid transparent;
        border-radius: 10px;
    }

    .bigger {
        font-size: 12px;
        padding: 0px 8px;
    }
}
</style>