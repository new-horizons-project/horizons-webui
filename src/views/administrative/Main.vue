<template>
    <div class="admin-wrapper block-style">
        <div class="navigation">
            <div class="section">
                <SectionHeader name-style="greyed" name="System" />

                <div class="links strawbery">
                    <router-link v-for="link in systemLinks" :key="link.to" :to="link.to" class="link" :class="{ current: $route.path === link.to }">
                        <img :src="link.iconUrl" alt="">
                        {{ link.label }}
                    </router-link>
                </div>
            </div>

            <div class="section" v-if="canAdministerData()">
                <SectionHeader name-style="greyed" name="Administration" />

                <div class="links yellowberry">
                    <router-link v-for="link in administrationLinks" :key="link.to" :to="link.to" class="link" :class="{ current: $route.path === link.to }">
                        <img :src="link.iconUrl" alt="">
                        {{ link.label }}
                    </router-link>
                </div>
            </div>
            
            <div class="section">
                <SectionHeader name-style="greyed" name="Moderation" />

                <div class="links">
                    <router-link v-for="link in moderationLinks" :key="link.to" :to="link.to" class="link" :class="{ current: $route.path === link.to }">
                        <img :src="link.iconUrl" alt="">
                        {{ link.label }}
                    </router-link>
                </div>
            </div>
        </div>

        <hr>

        <div class="page-wrapper">
            <router-view />
        </div>
    </div>
</template>

<script setup lang="ts">

import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import type { PathItemWithIcon } from '../../types/path';
import SectionHeader from '../../components/uiElements/SectionHeader.vue';
import { canManageData } from '../../scripts/user';
import { canAdministerData } from '../../scripts/user';

const router = useRouter();
const route = useRoute();

const systemLinks: PathItemWithIcon[] = [
    {
        to: "/system/home",
        label: "Home",
        iconUrl: "/icons/gear.png"
    },
    {
        to: "/system/application-parameters",
        label: "Application Parameters",
        iconUrl: "/icons/parameters.png"
    },
    {
        to: "/system/system-audit",
        label: "System Audit",
        iconUrl: "/icons/audit.png"
    }
];

const administrationLinks: PathItemWithIcon[] = [
    {
        to: "/system/users-management",
        label: "Users Management",
        iconUrl: "/icons/user.png"
    },
    {
        to: "/system/categories-management",
        label: "Category Management",
        iconUrl: "/icons/category.png"
    },
    {
        to: "/system/jwt",
        label: "JWT Management",
        iconUrl: "/icons/sessions.png"
    }
];

const moderationLinks: PathItemWithIcon[] = [
    {
        to: "/system/moderation-logs",
        label: "Moderation Logs",
        iconUrl: "/icons/logs.png"
    },
    {
        to: "/system/headless-topics",
        label: "Headless Topics",
        iconUrl: "/icons/headless.png"
    },
    {
        to: "/system/tags-management",
        label: "Tags Management",
        iconUrl: "/icons/tag.png"
    }
];

onMounted(() => {
    if (route.path === "/system") {
        router.push("/system/home");
    }

    if (!canManageData()) {
        router.push("/403-forbidden");
    }
});

</script>

<style lang="scss" scoped>

.admin-wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    margin-bottom: 10px;

    hr {
        height: 100% !important;
        width: 1px !important;
        position: relative;
    }
}

.navigation {
    padding: 10px 15px;
    width: 15%;
    min-width: 200px;
    display: flex;
    flex-direction: column;
    gap: 30px;

    .section {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 5px;
    }

    .links {
        display: flex;
        flex-direction: column;

        &.strawbery {
            .link img {
                filter: invert(30%) sepia(90%) saturate(2200%) hue-rotate(335deg) brightness(105%) contrast(95%);
            }
        }

        &.yellowberry {
            .link img {
                filter: invert(70%) sepia(95%) saturate(1400%) hue-rotate(5deg) brightness(95%) contrast(105%);
            }
        }

        .link {
            color: var(--color);
            border-radius: 7px;
            text-decoration: none;
            font-size: 14px;
            padding: 5px 8px;
            display: flex;
            align-items: center;
            gap: 10px;

            img {
                padding-right: 1px;
                filter: invert(34%) sepia(98%) saturate(3000%) hue-rotate(200deg);
                width: 16px;
                height: 16px;
            }

            &.current {
                background-color: var(--hover-primary-btn-color) !important;
            }
        }
    }
}

.page-wrapper {
    width: 85%;
}

</style>