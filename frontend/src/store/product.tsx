import { create } from 'zustand';

// interface useProductStoreType

// export const useProductStore = create((set) => ({
// 	products: [],
// 	setProducts: (products: object) => set({ products }),
// 	createProduct: async (newProduct) => {
// 		if (!newProduct.name || !newProduct.price || !newProduct.image) {
// 			return { success: false, message: 'Please fill in all the fields' };
// 		}
// 		const res = await fetch('/api/products', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json', // json,plain,xml,form-data
// 			},
// 			body: JSON.stringify(newProduct),
// 		});

// 		const data = await res.json();

// 		set((state) => ({ products: [...state.products, data.data] }));

// 		return { success: true, message: 'Product added successfully' };
// 	},
// }));

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
}));
