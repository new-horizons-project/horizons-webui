<template>
    <RouteredHeader 
        :show-button="canManageData()"
        button-text="Add Topic"
        :current-path="currentPath"
        @click="newTopic()"
    />
</template>

<script setup lang="ts">

import type { PathItem } from '../types/path';
import RouteredHeader from '../components/RouteredHeader.vue';
import { useRoute, useRouter } from 'vue-router';
import { useUiStore } from '../storage/ui';
import { canManageData } from '../scripts/user';

const route = useRoute();
const router = useRouter();
const uiStore = useUiStore();

const currentCategoryId = route.params.id;
uiStore.titleExtend = route.params.id?.toString() ?? "Category";

const currentPath: PathItem[] = [
    {
        to: "/categories",
        label: "Categories"
    },
    {
        to: "/categories/" + currentCategoryId,
        label: currentCategoryId?.toString() ?? ""
    }
];

function newTopic() {
    router.push(`/categories/${currentCategoryId}/new-topic`);
}

</script>

<style lang="scss" scoped>

</style>