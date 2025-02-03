import { Button, Container, VStack, Input, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import { Toaster, toaster } from '@/components/ui/toaster';
import { useProductStore, NewProductType } from '@/store/product';

const CreatePage = () => {
	const [newProduct, setNewProduct] = useState<NewProductType>({
		name: '',
		price: '',
		image: '',
	});

	const { createProduct } = useProductStore();

	const handleAddProduct = async () => {
		// const promise = new Promise<void>((resolve, reject) => {
		// 	setTimeout(() => resolve(), 2000);
		// });

		// toaster.promise(promise, {
		// 	success: {
		// 		title: 'Successfully Added',
		// 		description: 'Looks great',
		// 	},
		// 	error: {
		// 		title: 'Product added failed',
		// 		description: 'Something wrong with the upload',
		// 	},
		// 	loading: { title: 'Uploading...', description: 'Please wait' },
		// });

		const { success, message } = await createProduct(newProduct);

		if (!success) {
			toaster.error({
				title: 'Failed to add products.',
				description: message,
			});
		} else {
			toaster.success({
				title: 'Product added products.',
				description: message,
			});
		}

		console.log(newProduct);
		setNewProduct({ name: '', price: 0, image: '' });
	};

	return (
		<Container maxH={'container.sm'}>
			<VStack gap={19}>
				<Heading size={'2xl'} textAlign={'center'} mb={8} as={'h1'}>
					Create New Product
				</Heading>

				<Input
					placeholder="Product Name"
					value={newProduct.name}
					onChange={(e) =>
						setNewProduct({ ...newProduct, name: e.target.value })
					}
				></Input>
				<Input
					placeholder="Price"
					value={newProduct.price}
					onChange={(e) =>
						setNewProduct({ ...newProduct, price: e.target.value })
					}
				></Input>
				<Input
					placeholder="Image URL"
					value={newProduct.image}
					onChange={(e) =>
						setNewProduct({ ...newProduct, image: e.target.value })
					}
				></Input>
				<Button colorScheme={'blue'} w={'full'} onClick={handleAddProduct}>
					{' '}
					Add Product
				</Button>
			</VStack>
			<Toaster />
		</Container>
	);
};

export default CreatePage;
