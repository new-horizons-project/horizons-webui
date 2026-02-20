import { defineStore } from "pinia";
import { ref } from "vue";
import type { Category } from '../api/category';
import { notificationController } from "../scripts/notificationController";
import { getCategories } from "../api/category";

export const useCategoryStore = defineStore('category', () => {
    const categories = ref<Category[]>([]);
    const page = 1;
    
    async function load() {
        try {
            const res = await getCategories(page);

            if (res.status === 200) {
                categories.value = res.data.categories;
                return;
            }
        } catch (err: any) {
            notificationController.createNotification(
                "Unexpected error",
                `Code: ${err.status}. Please, contact administrator`,
                "",
                "error"
            );
        }
    }

    async function unload() {
        categories.value.splice(20);
    }

    return {
        page,
        load,
        unload,
        categories
    }
});