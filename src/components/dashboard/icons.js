import { Icons as nativeIcons } from 'react-basics';

const imageUrl = (name) => `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/${name}`;

const Icons = {
  ...nativeIcons,
  AddUser: imageUrl('add-user.svg'),
  Bolt: imageUrl('bolt.svg'),
  Calendar: imageUrl('calendar.svg'),
  Clock: imageUrl('clock.svg'),
  Dashboard: imageUrl('dashboard.svg'),
  Eye: imageUrl('eye.svg'),
  Gear: imageUrl('gear.svg'),
  Globe: imageUrl('globe.svg'),
  Lock: imageUrl('lock.svg'),
  Logo: imageUrl('logo.svg'),
  Moon: imageUrl('moon.svg'),
  Profile: imageUrl('profile.svg'),
  Sun: imageUrl('sun.svg'),
  User: imageUrl('user.svg'),
  Users: imageUrl('users.svg'),
  Visitor: imageUrl('visitor.svg'),
}

export default Icons;
