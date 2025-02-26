// Icons
import { WebIcon } from '@/components/Icons';
import { FaPhoneAlt, FaUser } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { HiMapPin } from 'react-icons/hi2';
import { IoBagSharp } from 'react-icons/io5';
import { RiHomeFill } from 'react-icons/ri';

// Constants
import { ERROR_MESSAGES } from './message';
import { ACCEPTED_FILE_TYPES, MAX_UPLOAD_SIZE } from './file';

export const VALIDATION_RULES = {
  IMAGE: {
    validate: (file: File) => {
      if (file.size > MAX_UPLOAD_SIZE) {
        return ERROR_MESSAGES.MAX_SIZE_IMAGE;
      }

      if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        return ERROR_MESSAGES.INVALID_FILE_TYPE;
      }
    },
  },
};

export const BASIC_FORM_FIELD = [
  {
    label: 'Phone',
    key: 'phone',
    name: 'phone',
    isRequired: true,
    ariaLabel: 'phone',
    icon: FaPhoneAlt,
    placeholder: '(123) 456-7890',
  },
  {
    label: 'Position',
    key: 'position',
    name: 'position',
    isRequired: true,
    ariaLabel: 'position',
    icon: IoBagSharp,
    placeholder: 'Please enter position',
  },
  {
    label: 'Location',
    key: 'location',
    name: 'location',
    isRequired: true,
    ariaLabel: 'location',
    icon: HiMapPin,
    placeholder: 'Please enter location',
  },
  {
    label: 'Website',
    key: 'website',
    name: 'website',
    isRequired: true,
    ariaLabel: 'website',
    icon: WebIcon,
    placeholder: 'Please enter website',
  },
  {
    label: 'Company',
    key: 'company',
    name: 'company',
    isRequired: true,
    ariaLabel: 'company',
    icon: IoBagSharp,
    placeholder: 'Please enter company',
  },
];

export const PERSONAL_FORM_FIELD = [
  {
    label: 'Full name',
    key: 'name',
    name: 'name',
    isRequired: true,
    ariaLabel: 'name',
    icon: FaUser,
    placeholder: 'Please enter name',
  },
  {
    label: 'Email address',
    key: 'email',
    name: 'email',
    isRequired: true,
    ariaLabel: 'email',
    icon: HiMail,
    placeholder: 'Please enter email',
  },
];

export const TEAM_FORM_FIELD = [
  {
    label: 'Team Name',
    key: 'teamName',
    name: 'teamName',
    isRequired: true,
    ariaLabel: 'teamName',
    icon: FaPhoneAlt,
    placeholder: 'Please enter team name',
  },
  {
    label: 'Rank',
    key: 'rank',
    name: 'rank',
    isRequired: true,
    ariaLabel: 'rank',
    icon: IoBagSharp,
    placeholder: 'Please enter rank',
    type: 'select',
    options: [
      { key: 'marketing', value: 'marketing', label: 'Marketing' },
      { key: 'design', value: 'design', label: 'Design' },
      { key: 'senior', value: 'senior', label: 'Senior' },
    ],
  },
  {
    label: 'Office',
    key: 'office',
    name: 'office',
    isRequired: true,
    ariaLabel: 'office',
    icon: HiMapPin,
    placeholder: 'Please enter office',
  },
  {
    label: 'Mail',
    key: 'teamMail',
    name: 'teamMail',
    ariaLabel: 'teamMail',
    icon: WebIcon,
    placeholder: 'Please enter mail',
  },
];

export const BILL_FORM_FIELD = [
  {
    label: 'Full name',
    key: 'billName',
    name: 'billName',
    isRequired: true,
    ariaLabel: 'billName',
    icon: FaUser,
    placeholder: 'Please enter full name',
  },
  {
    label: 'Address',
    key: 'billAddress',
    name: 'billAddress',
    isRequired: true,
    ariaLabel: 'billAddress',
    icon: RiHomeFill,
    placeholder: 'Please enter address',
  },
  {
    label: 'State',
    key: 'state',
    name: 'state',
    isRequired: true,
    ariaLabel: 'state',
    icon: HiMapPin,
    placeholder: 'Please enter state',
  },
  {
    label: 'Zip Code',
    key: 'zipCode',
    name: 'zipCode',
    isRequired: true,
    ariaLabel: 'zipCode',
    icon: HiMail,
    placeholder: 'Please enter zip code',
  },
];

export const GENERAL_FORM_FIELD = [
  {
    label: 'I’m mentioned in a message',
    key: 'mentionMessage',
    name: 'mentionMessage',
  },
  {
    label: 'Someone replies to any message',
    key: 'replyMessage',
    name: 'replyMessage',
  },
  {
    label: 'I’m assigned a task',
    key: 'assignTask',
    name: 'assignTask',
  },
  {
    label: 'A task is overdue',
    key: 'taskOverdue',
    name: 'taskOverdue',
  },
];

export const SUMMARY_FORM_FIELD = [
  {
    label: 'Daily summary',
    key: 'dailySummary',
    name: 'dailySummary',
  },
  {
    label: 'Weekly summary',
    key: 'weeklySummary',
    name: 'weeklySummary',
  },
  {
    label: 'Monthly summary',
    key: 'monthlySummary',
    name: 'monthlySummary',
  },
  {
    label: 'Annually summary',
    key: 'annuallySummary',
    name: 'annuallySummary',
  },
];
