// user.ts

interface NotificationSettings {
  pushNotifications: boolean;
  marketingConsent: boolean;
  likeNotifications: boolean;
  commentNotifications: boolean;
  messageNotifications: boolean;
}

interface RestrictionHistory {
  reason: string;
  startDate: string;
  endDate: string;
}

interface User {
  id: number;
  email: string;
  name: string;
  profileUrl: string;
  nickname: string;
  vegetarianLevel: string;
  vegetarianStartYear: number;
  communityPoints: number;
  notificationSettings: NotificationSettings;
  restrictionHistory: RestrictionHistory[];
}

const user: User = {
  id: 1,
  email: 'example@example.com',
  name: 'HongGilDong',
  profileUrl: 'https://example.com/profile/honggildong',
  nickname: 'VegetarianKingGilDong',
  vegetarianLevel: 'LactoOvo',
  vegetarianStartYear: 2020,
  communityPoints: 1500,
  notificationSettings: {
    pushNotifications: true,
    marketingConsent: false,
    likeNotifications: true,
    commentNotifications: true,
    messageNotifications: false,
  },
  restrictionHistory: [
    {
      reason: 'CommunityGuidelinesViolation',
      startDate: '2024-12-01',
      endDate: '2024-12-15',
    },
  ],
};

export default user;
