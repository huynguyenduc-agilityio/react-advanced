import { ChangeEvent, useCallback } from 'react';
import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
} from '@chakra-ui/react';

// Icons
import { CiSearch } from 'react-icons/ci';

type TSearchBoxProps = Omit<InputProps, 'onChange'> & {
  onChange: (value: string) => void;
};

const SearchBox = ({ onChange, ...rest }: TSearchBoxProps) => {
  const handleChangeValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => onChange(e.target.value),
    [onChange],
  );

  return (
    <InputGroup maxW={350}>
      <Input
        variant="secondary"
        type="text"
        placeholder="Search for..."
        paddingLeft="38px"
        onChange={handleChangeValue}
        {...rest}
      />
      <InputLeftElement
        pointerEvents="none"
        boxSize="38px"
        children={<Icon as={CiSearch} boxSize={4} color="pastelBlue" />}
        left={2}
      />
    </InputGroup>
  );
};

export default SearchBox;
