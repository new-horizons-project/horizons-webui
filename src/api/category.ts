import { api } from "./axios";

export interface Category {
    id: number;
    name: string;
    description: string;
    cover?: string;
}

export interface GetCategoriesResponse {
  categories: Category[];
  total: number;
}

export async function createCategory(title: string, description: string, display_mode: string) {
    const body = {
        name: title,
        description: description,
        display_mode: display_mode
    };

	const res = await api.post('/category/create', body,
		{ 
			headers: { 
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
		},
	);

	return res;
}

export async function getCategories(page: number) {
    const res = await api.get<GetCategoriesResponse>(`/category/?page=${page}&per_page=10`,
		{ 
			headers: { 
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
		},
	);

	return res;
}