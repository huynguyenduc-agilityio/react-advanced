import { ReactNode } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

type TNavLinkProps = {
  title: ReactNode;
  destination: string;
};

export const NavLink = ({ title, destination }: TNavLinkProps) => {
  const isDefaultFocused = location.pathname === '/' && title === 'Report';
  const isFocused = location.pathname === destination;

  const linkContent = (
    <Flex
      align="center"
      w="full"
      py={2.5}
      px={3.5}
      borderRadius="lg"
      role="group"
      cursor={!destination ? 'not-allowed' : 'pointer'}
      fontSize="md"
      opacity={!destination ? 0.6 : 1}
      _hover={
        destination
          ? {
              bg: 'darkBlue',
              color: 'white',
              borderLeft: '2px solid',
              borderColor: 'primary',
            }
          : {}
      }
      {...((isDefaultFocused || isFocused) &&
        destination && {
          bg: 'darkBlue',
          color: 'white',
          borderLeft: '2px solid',
          borderColor: 'primary',
        })}
    >
      {title}
    </Flex>
  );

  return !destination ? (
    <Box>{linkContent}</Box>
  ) : (
    <Link to={destination} style={{ width: '100%' }}>
      {linkContent}
    </Link>
  );
};
