import { render } from '@testing-library/react';
import { FaCreditCard, FaUser } from 'react-icons/fa';
import { HiMiniPencil } from 'react-icons/hi2';
import { RiNotification2Fill } from 'react-icons/ri';

import Tabs from '..';

const mockTabs = [
  {
    label: 'Personal Information',
    icon: HiMiniPencil,
    content: <></>,
  },
  {
    label: 'Team',
    icon: FaUser,
    content: <></>,
  },
  {
    label: 'Billing',
    icon: FaCreditCard,
    content: <></>,
  },
  {
    label: 'Notifications',
    icon: RiNotification2Fill,
    content: <></>,
  },
];

describe('Tabs component', () => {
  it('renders correctly and matches snapshot (only tabs structure)', () => {
    const { container } = render(<Tabs tabs={mockTabs} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
