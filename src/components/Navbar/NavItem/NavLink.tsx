import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';

type TNavLinkProps = {
  title: ReactNode;
  destination: string;
};

export const NavLink = ({ title, destination }: TNavLinkProps) => {
  const isDefaultFocused = location.pathname === '/' && title === 'Report';
  const isFocused = location.pathname.includes(destination);

  return (
    <Link to={destination} style={{ width: '100%' }}>
      <Flex
        align="center"
        w="full"
        py={2.5}
        px={3.5}
        borderRadius="lg"
        role="group"
        cursor="pointer"
        fontSize="md"
        _hover={{
          bg: 'darkBlue',
          color: 'white',
          borderLeft: '2px solid',
          borderColor: 'primary',
        }}
        {...((isDefaultFocused || isFocused) && {
          bg: 'darkBlue',
          color: 'white',
          borderLeft: '2px solid',
          borderColor: 'primary',
        })}
      >
        {title}
      </Flex>
    </Link>
  );
};
