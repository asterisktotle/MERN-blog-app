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
		const { success, message } = await createProduct(newProduct);

		const promise = new Promise<void>((resolve, reject) => {
			setTimeout(() => {
				if (!success) {
					reject();
				} else resolve();
			}, 3000);
		});

		toaster.promise(promise, {
			success: {
				title: message,
				description: 'Looks great',
			},
			error: {
				title: 'Product added failed',
				description: message,
			},
			loading: { title: 'Adding the product...', description: 'Please wait' },
		});

		console.log(newProduct);
		setNewProduct({ name: '', price: 0, image: '', _id: '' });
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
