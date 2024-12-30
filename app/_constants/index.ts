import {
  HiCalendarDateRange,
  HiChartBar,
  HiCog6Tooth,
  HiHome,
  HiHomeModern,
  HiUsers,
} from 'react-icons/hi2';

export const PAGE_SIZE = 10;

export const dashboardNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HiHome, current: true },
  {
    name: 'Bookings',
    href: '/dashboard/bookings',
    icon: HiCalendarDateRange,
    current: false,
  },
  {
    name: 'Cabins',
    href: '/dashboard/cabins',
    icon: HiHomeModern,
    current: false,
  },
  { name: 'Users', href: '/dashboard/users', icon: HiUsers, current: false },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: HiCog6Tooth,
    current: false,
  },
  {
    name: 'Reports',
    href: '/dashboard/reports',
    icon: HiChartBar,
    current: false,
  },
];

export const dashboardUserNavigation = [
  { name: 'Your Account', href: '/dashboard/account' },
  { name: 'Settings', href: '/dashboard/settings' },
  { name: 'Sign out', href: '#' },
];

export const NewUserFormInitialState = {
  success: false,
  message: '',
  errors: {},
  inputs: {
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
};

export const UpdateSettingsFormInitialState = {
  success: false,
  message: '',
  errors: {},
  inputs: {
    minBookingLength: '',
    maxBookingLength: '',
    maxGuestsPerBooking: '',
    breakfastPrice: '',
  },
};

export const UpdateUserDataFormInitialState = {
  success: false,
  message: '',
  errors: {},
  inputs: {
    fullName: '',
    inputs: {
      fullName: '',
      avatar: null,
    },
  },
};

export const UpdatePasswordFormInitialState = {
  success: false,
  message: '',
  errors: {},
  inputs: {
    password: '',
    confirmPassword: '',
  },
};
export const createCabinInitialState = {
  success: false,
  message: '',
  errors: {},
  inputs: {
    name: '',
    maxCapacity: 0,
    regularPrice: 0,
    discount: 0,
    description: '',
    image: null,
  },
};

export const editCabinInitialState = {
  success: false,
  message: '',
  errors: {},
  inputs: {
    name: '',
    maxCapacity: 0,
    regularPrice: 0,
    discount: 0,
    description: '',
    image: null,
  },
};

export const createBookingInitialState = {
  success: false,
  message: '',
  errors: {},
  inputs: {
    numGuests: 0,
    observations: '',
    startDate: '',
    endDate: '',
    numNights: 0,
    cabinPrice: 0,
    cabinId: 0,
  },
};
