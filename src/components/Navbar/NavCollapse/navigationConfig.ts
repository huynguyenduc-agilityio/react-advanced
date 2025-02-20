// Constants
import { PUBLIC_ROUTERS } from '@/constants';

// Icons
import { HomeIcon, IntegrateIcon, MoneyIcon, WebflowIcon } from '@/icons';
import { FaStar, FaUser } from 'react-icons/fa';
import { MdSettings } from 'react-icons/md';

const navigationConfig = [
  {
    title: 'Dashboard',
    icon: HomeIcon,
    subNav: [
      {
        title: 'All pages',
        url: PUBLIC_ROUTERS.NOT_FOUND,
      },
      {
        title: 'Report',
        url: PUBLIC_ROUTERS.REPORT,
      },
      {
        title: 'Products',
        url: PUBLIC_ROUTERS.NOT_FOUND,
      },
      {
        title: 'Task',
        url: PUBLIC_ROUTERS.NOT_FOUND,
      },
    ],
  },
  {
    title: 'Features',
    icon: FaStar,
    subNav: [],
  },
  {
    title: 'Users',
    icon: FaUser,
    subNav: [
      {
        title: 'Add Users',
        url: PUBLIC_ROUTERS.USER_ADD,
      },
    ],
  },
  {
    title: 'Pricing',
    icon: MoneyIcon,
    subNav: [],
  },
  {
    title: 'Integrations',
    icon: IntegrateIcon,
    subNav: [],
  },
  {
    title: 'Settings',
    icon: MdSettings,
    subNav: [],
  },
  {
    title: 'Template pages',
    icon: WebflowIcon,
    subNav: [],
  },
];

export default navigationConfig;
