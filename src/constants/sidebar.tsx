import DashboardIcon from '@/icons/dashboard-icon';
import { LayoutDashboardIcon, Settings, User } from 'lucide-react';

export type SidebarItemProps = {
  id: number;
  title: string;
  icon: JSX.Element;
  href: string;
};

export const sidebarItem: SidebarItemProps[] = [
  {
    id: 1,
    title: 'Dashboard',
    icon: <LayoutDashboardIcon />,
    href: '/dashboard',
  },
  {
    id: 2,
    title: 'Profile',
    icon: <User />,
    href: '/profile',
  },
  {
    id: 3,
    title: 'Settings',
    icon: <Settings />,
    href: '/settings',
  },
];
