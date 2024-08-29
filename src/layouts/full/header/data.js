
import img1 from 'src/assets/images/students/student1.jpg';
import img2 from 'src/assets/images/students/student2.avif';
import img3 from 'src/assets/images/students/student3.jpg';
import img4 from 'src/assets/images/alumni/alumni1.jpg';
import img5 from 'src/assets/images/alumni/alumni2.jpg';
import img6 from 'src/assets/images/alumni/alumni3.webp';

//
// Notifications dropdown
//
const notifications = [
  {
    avatar: img1,
    title: 'Roman Joined the Team!',
    subtitle: 'Congratulate him',
  },
  {
    avatar: img2,
    title: 'New message received',
    subtitle: 'Salma sent you new message',
  },
  {
    avatar: img3,
    title: 'New Payment received',
    subtitle: 'Check your earnings',
  },
  {
    avatar: img4,
    title: 'Jolly completed tasks',
    subtitle: 'Assign her new tasks',
  },
  {
    avatar: img5,
    title: 'Roman Joined the Team!',
    subtitle: 'Congratulate him',
  },
  {
    avatar: img6,
    title: 'New message received',
    subtitle: 'Salma sent you new message',
  },
  // {
   
  //   title: 'New Payment received',
  //   subtitle: 'Check your earnings',
  // },
  // {
    
  //   title: 'Jolly completed tasks',
  //   subtitle: 'Assign her new tasks',
  // },
];

//
// Profile dropdown
//
const profile = [
  {
    href: '/user-profile',
    title: 'My Profile',
    subtitle: 'Account Settings',
    
  },
  {
    href: '/apps/email',
    title: 'My Inbox',
    subtitle: 'Messages & Emails',
    
  },
  {
    href: '/apps/notes',
    title: 'My Tasks',
    subtitle: 'To-do and Daily Tasks',
   
  },
];

// apps dropdown

const appsLink = [
  {
    href: '/apps/chats',
    title: 'Chat Application',
    subtext: 'Messages & Emails',
    
  },
  {
    href: '/apps/ecommerce/shop',
    title: 'eCommerce App',
    subtext: 'Messages & Emails',
   
  },
  {
    href: '/',
    title: 'Invoice App',
    subtext: 'Messages & Emails',
  
  },
  {
    href: '/apps/calendar',
    title: 'Calendar App',
    subtext: 'Messages & Emails',
   
  },
  {
    href: '/apps/contacts',
    title: 'Contact Application',
    subtext: 'Account settings',
    
  },
  {
    href: '/apps/tickets',
    title: 'Tickets App',
    subtext: 'Account settings',
   
  },
  {
    href: '/apps/email',
    title: 'Email App',
    subtext: 'To-do and Daily tasks',
   
  },
  {
    href: '/',
    title: 'Kanban Application',
    subtext: 'To-do and Daily tasks',
    
  },
]

const pageLinks = [
  {
    href: '/pricing',
    title: 'Pricing Page'
  },
  {
    href: '/auth/login',
    title: 'Authentication Design'
  },
  {
    href: '/auth/register',
    title: 'Register Now'
  },
  {
    href: '/404',
    title: '404 Error Page'
  },
  {
    href: '/apps/notes',
    title: 'Notes App'
  },
  {
    href: '/user-profile',
    title: 'User Application'
  },
  {
    href: '/apps/blog/posts',
    title: 'Blog Design'
  },
  {
    href: '/apps/ecommerce/eco-checkout',
    title: 'Shopping Cart'
  },
]

export { notifications, profile, pageLinks, appsLink };
