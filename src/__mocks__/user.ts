// Icons
import { KebabIcon, HeartIcon, UserGroupIcon, UserIcon } from '@/components';

// Types

import { IUserModel, NotificationType, Status as StatusEnum } from '@/types';

export const mockInitialValuesUser: IUserModel = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '123456789',
  position: 'Software Engineer',
  location: 'New York',
  website: 'https://johndoe.com',
  company: 'Tech Corp',
  description: 'Passionate about coding.',
  teamName: 'Google',
  rank: 'marketing',
  office: 'New York, NY',
  teamMail: 'dashdark@gmail.com',
  payment: 'VISA',
  billName: 'John Carter',
  billAddress: '601 4th St #103',
  state: 'Los Angeles',
  zipCode: '90001',
  mentionMessage: NotificationType.InApp,
  replyMessage: NotificationType.Email,
  assignTask: NotificationType.Email,
  taskOverdue: NotificationType.InApp,
  dailySummary: NotificationType.Email,
  weeklySummary: NotificationType.InApp,
  monthlySummary: NotificationType.InApp,
  annuallySummary: NotificationType.Email,
  status: StatusEnum.Online,
};

export const mockUsers = {
  items: [
    {
      id: '1',
      name: 'John Doe',
      avatar: '',
      email: 'john@example.com',
      phone: '123-456-7890',
      location: 'New York',
      company: 'Tech Inc',
      status: 'active',
    },
  ],
  meta: { pagination: { total: 1, pageCount: 1 } },
};

export const MOCK_SUMMARY_DASHBOARD = [
  {
    id: '1',
    title: 'Total Users',
    total: 250,
    icon: UserGroupIcon,
  },
  {
    id: '2',
    title: 'New Users',
    total: 15,
    icon: UserIcon,
  },
  {
    id: '3',
    title: 'Top Users',
    total: 200,
    icon: HeartIcon,
  },
  {
    id: '4',
    title: 'Other Users',
    total: 35,
    icon: KebabIcon,
  },
];
