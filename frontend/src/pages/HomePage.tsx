import { Container, VStack, Text, SimpleGrid, Box } from '@chakra-ui/react';
import { useProductStore } from '@/store/product';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';

const HomePage = () => {
	const { fetchProduct, products } = useProductStore();

	useEffect(() => {
		fetchProduct();
	}, [fetchProduct]);

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
					{products && products.length > 0 ? (
						products.map((item) => (
							<ProductCard
								key={item.image}
								price={item.price}
								name={item.name}
								image={item.image}
								_id={item._id}
							/>
						))
					) : (
						<Box>
							No Products found{' '}
							<Link to={'/create'}>
								<Text>Create a Product</Text>
							</Link>{' '}
						</Box>
					)}
				</SimpleGrid>
			</VStack>
		</Container>
	);
};

export default HomePage;
