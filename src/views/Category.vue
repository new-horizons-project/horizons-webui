<template>
    <RouteredHeader 
        :show-button="canManageData()"
        button-text="Add Topic"
        :current-path="currentPath"
        @click="newTopic()"
    />
    <div class="block-wrapper">
        <div class="topic-cards-wrapper">
            <TopicCard />
        </div>
    </div>
</template>

<script setup lang="ts">

import type { PathItem } from '../types/path';
import RouteredHeader from '../components/RouteredHeader.vue';
import TopicCard from '../components/TopicCard.vue';
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
        label: "Test"
    }
];

function newTopic() {
    router.push(`/categories/${currentCategoryId}/new-topic`);
}

</script>

<style lang="scss" scoped>

.block-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.topic-cards-wrapper {
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

</style>