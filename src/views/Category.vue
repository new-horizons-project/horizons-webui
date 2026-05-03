<template>
    <RouteredHeader 
        :show-button="canManageData()"
        button-text="Add Topic"
        :current-path="currentPath"
        @click="newTopic()"
    />
    <div class="block-wrapper">
        <div class="category-card block-style">
            <img src="/placeholder.png" v-if="true" class="category-image">

            <hr>

            <div class="info-block">
                <div class="category-name">
                    Test
                </div>

                <Tags :tags="tags" :bigger="true" />

                <div class="category-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. At, eligendi ex. Repudiandae neque magni quasi.
                </div>
                
                <div class="slidered-block">
                    <div class="hred-delimiter">
                        <SectionHeader name-style="default" name="Editors">
                            <div class="open-arrow" :class="{ 'opened': opened }" @click="opened = !opened">
                                <i class="fas fa-chevron-down" />
                            </div>
                        </SectionHeader>
                    </div>

                    <transition name="expand">
                        <div class="team" v-show="opened">
                            <div class="team-member">
                                <div class="img-alternative">J</div>
                            </div>

                            <div class="team-member">
                                <div class="img-alternative">D</div>
                            </div>

                            <div class="team-member">
                                <div class="img-alternative">H</div>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
        </div>

        <div class="topic-cards-wrapper">
            <TopicCard />
        </div>
    </div>
</template>

<script setup lang="ts">

import type { PathItem } from '../types/path';
import RouteredHeader from '../components/uiElements/RouteredHeader.vue';
import TopicCard from '../components/topic/TopicCard.vue';
import { useRoute, useRouter } from 'vue-router';
import Tags from '../components/uiElements/Tags.vue';
import { Tag } from '../types/tags';
import { useUiStore } from '../storage/ui';
import { ref } from 'vue';
import { canManageData } from '../scripts/user';
import SectionHeader from '../components/uiElements/SectionHeader.vue';

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

const tags: Tag[] = [
    new Tag(1, "tag-1"),
    new Tag(2, "tag-2"),
    new Tag(3, "tag-3"),
]

const opened = ref(false);

</script>

<style lang="scss" scoped>

.block-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 20px;

    @media (max-width: 800px) {
        flex-direction: column;
        align-items: center;
    }
}

.category-card {
    width: 20%;
    min-width: 300px;
    max-width: 300px;
    height: fit-content;
    overflow: hidden;

    .category-image {
        width: 100%;
        border: none;
        display: block;
        aspect-ratio: 1 / 1;
        object-fit: cover;
    }

    .info-block {
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 8px;

        .category-name {
            font-size: 20px;
            font-weight: 600;
        }

        .category-description {
            font-size: 15px;
            color: var(--color-dim);
        }
    }

    .slidered-block {
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }

    .hred-delimiter {
        .open-arrow {
            cursor: pointer;
            font-size: 14px;
            transform: rotate(180deg);
            transition: transform 500ms;

            &.opened {
                transform: rotate(0deg);
            }
        }
    }

    @media (max-width: 800px) {
        max-width: none;
        width: 80%;
    }

    @media (max-width: 630px) {
        width: 100%;
    }

    .team {
        display: flex;
        gap: 10px;
        margin-top: 10px;

        .team-member {
            display: flex;
            align-items: center;
            gap: 10px;

            &:hover .hover-name {
                display: block;
            }

            .img-alternative {
                width: 40px;
                height: 40px;
                border: 1px solid var(--border-color);
                border-radius: 50%;
                background-color: var(--background-color);
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 600;
            }
        }
    }
}

.expand-enter-active {
    transition: max-height 400ms ease;
    overflow: hidden;
}

.expand-enter-from {
    max-height: 0;
}

.expand-enter-to {
    max-height: 50px;
}

.expand-enter-active .team-member {
    opacity: 0;
    transition: opacity 200ms ease;
    transition-delay: 200ms;
}

.expand-enter-to .team-member {
    opacity: 1;
}

.expand-leave-from {
    max-height: 50px;
}

.expand-leave-to {
    max-height: 0;
}

.topic-cards-wrapper {
    width: 80%;
    max-width: 1100px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

    @media (max-width: 630px) {
        width: 100%;
    }
}

</style>