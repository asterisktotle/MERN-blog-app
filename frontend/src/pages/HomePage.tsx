import { Container, VStack, Text, SimpleGrid } from '@chakra-ui/react';
import { useProductStore } from '@/store/product';
import { useEffect } from 'react';

const HomePage = () => {
	const { fetchProduct, products } = useProductStore();

	useEffect(() => {
		fetchProduct();
	}, [fetchProduct]);

	console.log(products);

	return (
		<Container maxW="container.xl" py={12}>
			<VStack gap={8}>
				<Text
					fontSize={'30'}
					fontWeight={'bold'}
					bgGradient={'linear(to-r, cyan.400, blue.500)'}
					textAlign={'center'}
				>
					Current Products 🚀
				</Text>

				<SimpleGrid
					columns={{
						base: 1,
						md: 2,
						lg: 3,
					}}
					gap={10}
					w={'full'}
				>
					{products && products.length ? (
						products.map((item) => (
							<div key={item.name}>
								<img src={item.image} alt={item.name} />
								<p>{item.name}</p>
								<p>{item.price}</p>
							</div>
						))
					) : (
						<Text>No Products Added </Text>
					)}
				</SimpleGrid>
			</VStack>
		</Container>
	);
};

export default HomePage;
