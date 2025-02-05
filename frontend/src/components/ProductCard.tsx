import {
	Box,
	Button,
	Heading,
	HStack,
	Image,
	Text,
	useDisclosure,
} from '@chakra-ui/react';

import { Toaster, toaster } from '@/components/ui/toaster';

import { NewProductType, useProductStore } from '@/store/product';

import { useState } from 'react';

const ProductCard = ({ name, price, image, _id }: NewProductType) => {
	const [updatedProduct, setUpdatedProduct] = useState<NewProductType>();
	const { onOpen, onClose, setOpen } = useDisclosure();
	const { deleteProduct, updateProduct } = useProductStore();

	const handleDeleteProduct = async (productId: string) => {
		const { success, message } = await deleteProduct(productId);

		const promise = new Promise<void>((resolve, reject) => {
			setTimeout(() => {
				if (success) {
					resolve();
				} else {
					reject();
				}
			}, 1000);
		});

		toaster.promise(promise, {
			success: {
				title: message,
			},
			error: {
				title: message,
			},
			loading: {
				title: 'Deleting product...',
				description: 'Please wait',
			},
		});
	};

	const handleUpdateProduct = async (productId: string, updatedProduct) => {
		// const {success, message} = await updateProduct(productId, updatedProduct);

		console.log('product updated: ', updatedProduct);
	};

	return (
		<Box
			shadow={'lg'}
			rounded={'lg'}
			overflow={'hidden'}
			bg={'blue.800'}
			color={'white'}
			p={3}
			transition="all 0.3s"
			_hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
		>
			<Image src={image} alt={name} h={48} w={'full'} objectFit="cover" />

			<Box p={4}>
				<Heading as={'h3'} size="md" mb={2}>
					{name}
				</Heading>

				<Text fontWeight={'bold'} fontSize="xl" color={'white'} mb={4}>
					{price}
				</Text>

				<HStack gap={4} justify={'center'}>
					<Button onClick={() => console.log('updated click')}> 📝</Button>
					<Button onClick={() => handleDeleteProduct(_id)}> 🗑️</Button>
				</HStack>
			</Box>
			<Toaster />
		</Box>
	);
};

export default ProductCard;
