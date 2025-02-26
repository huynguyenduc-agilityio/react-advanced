import { NotificationType } from '@/types';

export interface IUserPersonalInfo {
  name: string;
  avatar?: string;
  email: string;
  description?: string;
  phone: string;
  position: string;
  location: string;
  website: string;
  company: string;
  status?: string;
}

export interface IUserTeamInfo {
  teamName: string;
  rank: string;
  office: string;
  teamMail: string;
}

export interface IUserBillInfo {
  payment: string;
  billName: string;
  billAddress: string;
  state: string;
  zipCode: string;
}

export interface IUserNotifications {
  mentionMessage?: NotificationType;
  replyMessage?: NotificationType;
  assignTask?: NotificationType;
  taskOverdue?: NotificationType;
  dailySummary?: NotificationType;
  weeklySummary?: NotificationType;
  monthlySummary?: NotificationType;
  annuallySummary?: NotificationType;
}

export interface IUserModel
  extends IUserPersonalInfo,
    IUserTeamInfo,
    IUserBillInfo,
    IUserNotifications {
  id?: string;
}

export interface IUsers {
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
  items: IUserModel[];
}
