import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from '@chakra-ui/react';

// Icons
import { HiMiniPencil } from 'react-icons/hi2';
import { FaCreditCard, FaUser } from 'react-icons/fa';
import { RiNotification2Fill } from 'react-icons/ri';

// Components
import Tabs from '.';

const TAB_LIST = [
  {
    label: 'Personal Information',
    icon: HiMiniPencil,
    content: (
      <p>
        1. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam, ut
        odio. Enim sint excepturi dolor vero provident, quisquam et totam
        doloribus aspernatur, laborum molestias, dolores ipsum non nobis labore
        temporibus.
      </p>
    ),
  },
  {
    label: 'Team',
    icon: FaUser,
    content: (
      <p>
        2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut enim
        dolorum similique corporis rem sequi, eos numquam quia velit vel non.
        Suscipit non fugiat nesciunt exercitationem totam, ipsa molestias
        praesentium.
      </p>
    ),
  },
  {
    label: 'Billing',
    icon: FaCreditCard,
    content: (
      <p>
        3. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
        incidunt consequuntur modi sint sunt, maiores ullam est pariatur impedit
        libero labore nisi provident perspiciatis. Autem, nulla eligendi! Rerum,
        itaque veritatis!
      </p>
    ),
  },
  {
    label: 'Notifications',
    icon: RiNotification2Fill,
    content: (
      <p>
        4. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
        doloremque quos quod, ut deleniti saepe excepturi quibusdam! Voluptatum
        eius, voluptatibus animi cum illo, adipisci reiciendis, nam sit maiores
        a praesentium?
      </p>
    ),
  },
];

const defaultProps = {
  tabs: TAB_LIST,
};

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
  render: (args) => (
    <Flex
      justifyContent="center"
      w="1000px"
      p={9}
      bgColor="spaceBlue"
      color="pastelBlue"
    >
      <Tabs {...args} />
    </Flex>
  ),
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: defaultProps,
};
