import { create } from 'zustand';

export interface NewProductType {
	name: string;
	price: number;
	image: string;
}

interface UseProductStoreType {
	products: NewProductType[];
	setProducts: (products: NewProductType[]) => void;
	createProduct: (newProduct: NewProductType) => Promise<{
		success: boolean;
		message: string;
	}>;
	fetchProduct: () => Promise<void>;
}

export const useProductStore = create<UseProductStoreType>((set) => ({
	products: [],
	setProducts: (products: NewProductType[]) => set({ products }),

	createProduct: async (newProduct: NewProductType) => {
		if (!newProduct.name || !newProduct.price || !newProduct.image) {
			return { success: false, message: 'Please fill in all the fields' };
		}

		// send it to backend
		const res = await fetch('/api/products', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newProduct),
		});

		const data = await res.json();

		set((state) => ({ products: [...state.products, data.data] }));
		return { success: true, message: 'Product added successfully' };
	},

	fetchProduct: async () => {
		try {
			const res = await fetch('/api/products');

			if (!res.ok) {
				throw new Error(`Server Error (${res.status}): ${res.statusText}`);
			}

			const data = await res.json();

			if (!data || !data.data) {
				throw new Error('Invalid response format');
			}

			set({ products: data.data });
		} catch (err) {
			console.error(err);
		}
	},
}));
