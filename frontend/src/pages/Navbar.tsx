import { Container, Flex } from '@chakra-ui/react';
import { Text, HStack, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { FaRegPlusSquare } from 'react-icons/fa';
import { useColorMode } from '@/components/ui/color-mode';
import { LuMoon, LuSun } from 'react-icons/lu';

const Navbar = () => {
	const { toggleColorMode, colorMode } = useColorMode();

	return (
		<Container fluid={true} maxW={'1140px'} px={4}>
			<Flex
				h={16}
				alignItems={'center'}
				justifyContent={'space-between'}
				flexDir={{ base: 'column', sm: 'row' }}
			>
				<Text
					fontSize={{ base: '22', sm: '28' }}
					fontWeight={'bold'}
					textTransform={'uppercase'}
					// bgGradient={'linear(to-r, cyan.400, blue.500)'}
					textAlign={'center'}
					// bgClip={'text'}
				>
					<Link to={'/'}> Product Store 🛒 </Link>
				</Text>

				<HStack gap={5} alignItems={'center'}>
					<Link to={'/create'}>
						<Button>
							<FaRegPlusSquare fontSize={20} />
						</Button>
					</Link>
					<Button onClick={toggleColorMode}>
						{colorMode === 'light' ? <LuMoon /> : <LuSun size="20" />}
					</Button>
				</HStack>
			</Flex>
		</Container>
	);
};

export default Navbar;
