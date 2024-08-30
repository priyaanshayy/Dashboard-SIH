import {
  IconAperture, IconCopy, IconLayoutDashboard, IconLogin, IconMoodHappy, IconTypography, IconUserPlus
} from '@tabler/icons-react';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },
  {
    navlabel: true,
    subheader: 'Users',
  },
  {
    id: uniqueId(),
    title: 'Alumni',
    icon: IconTypography,
    href: '/ui/typography',
  },
  {
    id: uniqueId(),
    title: 'Students',
    icon: IconCopy,
    href: '/ui/shadow',
  },
  // {
  //   navlabel: true,
  //   subheader: 'Auth',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Login',
  //   icon: IconLogin,
  //   href: '/auth/login',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Register',
  //   icon: IconUserPlus,
  //   href: '/auth/register',
  // },
  {
    navlabel: true,
    subheader: 'Support',
  },
  {
    id: uniqueId(),
    title: 'Help & Support',
    icon: IconMoodHappy,
    href: '/icons',
  },
  {
    id: uniqueId(),
    title: 'Settings',
    icon: IconAperture,
    href: '/sample-page',
  },
];

export default Menuitems;
