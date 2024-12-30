declare type CabinDiscount = 'with-discount' | 'no-discount' | 'all';
declare type CabinSortBy =
  | 'name-asc'
  | 'name-desc'
  | 'regularPrice-asc'
  | 'regularPrice-desc'
  | 'maxCapacity-asc'
  | 'maxCapacity-desc';

declare type BookingStatus = 'unconfirmed' | 'checked-in' | 'checked-out';

// server actions
declare interface AddressFormData {
  streetAddress: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

declare interface ActionResponse {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof AddressFormData]?: string[];
  };
  inputs?: AddressFormData;
}

declare type CreateUserFormData = {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

declare type CreateUserActionResponse = {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof CreateUserFormData]?: string[];
  };
  inputs?: CreateUserFormData;
};

declare type UpdateSettingsFormData = {
  minBookingLength: string;
  maxBookingLength: string;
  maxGuestsPerBooking: string;
  breakfastPrice: string;
};

declare type UpdateSettingsResponse = {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof UpdateSettingsFormData]?: string[];
  };
  inputs?: {
    [Key in keyof UpdateSettingsFormData]?: UpdateSettingsFormData[Key];
  };
};

declare type UpdateUserFormData = {
  fullName: string;
  avatar: FileList[0];
};

declare type UpdateUserResponse = {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof UpdateUserFormData]?: string[];
  };
  inputs?: {
    [Key in keyof UpdateUserFormData]?: UpdateUserFormData[Key];
  };
};

declare type UpdatePasswordFormData = {
  password: string;
  confirmPassword: string;
};

declare type UpdatePasswordResponse = {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof UpdatePasswordFormData]?: string[];
  };
  inputs?: {
    [Key in keyof UpdatePasswordFormData]?: UpdatePasswordFormData[Key];
  };
};

declare type CreateCabinFormData = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: FileList[0] | null;
};

declare type CreateCabinResponse = {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof CreateCabinFormData]?: string[];
  };
  inputs?: {
    [Key in keyof CreateCabinFormData]?: CreateCabinFormData[Key];
  };
};

declare type UpdateCabinFormData = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: FileList[0] | null;
};

declare type UpdateCabinResponse = {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof UpdateCabinFormData]?: string[];
  };
  inputs?: {
    [Key in keyof UpdateCabinFormData]?: UpdateCabinFormData[Key];
  };
};

declare type CreateBookingFormData = {
  numGuests: number; // '2';
  observations: string; // 'Lorem ipsum dolor sit amet, consectetur adipiscing elit
  startDate: string; //'Mon Dec 30 2024 00:00:00 GMT+0530 (India Standard Time)';
  endDate: string; // 'Mon Jan 20 2025 00:00:00 GMT+0530 (India Standard Time)';
  numNights: number; //'21';
  cabinPrice: number; //'14049';
  cabinId: number; //'21';
};

declare type CreateBookingResponse = {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof CreateBookingFormData]?: string[];
  };
  inputs?: {
    [Key in keyof CreateBookingFormData]?: CreateBookingFormData[Key];
  };
};

declare type GetBookingsParams = {
  filter: {
    field: 'status' | ({} & string);
    value: 'checked-out' | 'checked-in' | 'unconfirmed' | 'all' | ({} & string);
    method?: 'eq' | 'gt' | 'lt' | 'gte' | 'lte';
  } | null;
  sortBy: {
    field: 'startDate' | 'totalPrice' | ({} & string);
    direction: 'asc' | 'desc' | ({} & string);
  };
  page: number;
};

declare type Booking = {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: BookingStatus;
  hasBreakfast: boolean;
  isPaid: boolean;
  observations?: string;
  cabins: {
    name: string;
  };
  guests: {
    fullName: string;
    email: string;
    country: string;
    countryFlag: string;
    nationalID: string;
  };
};

declare type BookingAfterDate = {
  created_at: string;
  totalPrice: number;
  extrasPrice: number;
};

declare type StayAfterDate = {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: BookingStatus;
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string;
  cabinId: number;
  guestId: number;
  guests: {
    fullName: string;
  }[];
};

declare type Cabin = {
  id: number;
  created_at: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
};

declare type Settings = {
  id: number;
  created_at: string;
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
};

declare type UpdateBookingParamsObj = {
  status?: BookingStatus;
  isPaid?: boolean;
  breakfast?: {
    hasBreakfast?: boolean;
    extrasPrice?: number;
    totalPrice?: number;
  };
};

// Pages types
declare type DashboardPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    last?: string;
  }>;
};

declare type BookingsPageSearchParams = Promise<{
  status?: string;
  sortBy?: string;
  page?: string;
}>;

declare type BookingsPageProps = {
  params: Promise<{ id: string }>;
  searchParams: BookingsPageSearchParams;
};

declare type BookingPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string }>;
};

declare type CheckInPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string }>;
};

declare type CabinsPageSearchParams = Promise<{
  discount?: CabinDiscount;
  sortBy?: CabinSortBy;
  page?: string;
}>;

declare type CabinsPageProps = {
  params: Promise<{ id: string }>;
  searchParams: CabinsPageSearchParams;
};

// Components types
declare type StatsProps = {
  bookings: BookingAfterDate[];
  confirmedStays: StayAfterDate[];
  numDays: number;
  cabinCount: number;
};

declare type StatCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  color: string;
};

declare type DurationChartStartData = {
  duration: string;
  value: number;
  color: string;
};

declare type InclusiveArrayValueField =
  | '1 night'
  | '2 nights'
  | '3 nights'
  | '4-5 nights'
  | '6-7 nights'
  | '8-14 nights'
  | '15-21 nights'
  | '21+ nights'
  | ({} & string);

declare type SalesChartProps = {
  bookings: BookingAfterDate[];
  numDays: number;
};

declare type SaleData = {
  label: string;
  totalSales: number;
  extrasSales: number;
};

declare type TableWrapperProps = React.ComponentProps<'div'> &
  React.PropsWithChildren<object>;

declare type TableProps = React.ComponentProps<'table'> &
  React.PropsWithChildren<object>;

declare type TableHeadProps = React.ComponentProps<'thead'> &
  React.PropsWithChildren<object>;

declare type TableRowProps = React.ComponentProps<'tr'> &
  React.PropsWithChildren<object>;

declare type TableHeaderProps = React.ComponentProps<'th'> &
  React.PropsWithChildren<object>;

declare type TableBodyProps = React.ComponentProps<'tbody'> &
  React.PropsWithChildren<object>;

declare type TableDataProps = React.ComponentProps<'td'> &
  React.PropsWithChildren<object>;

declare type TablePaginationProps = {
  count: number | null;
  searchParams: BookingsPageSearchParams;
};

declare type BookingTableProps = {
  searchParams: BookingsPageSearchParams;
};

declare type BookingRowDropDownProps = {
  booking: Booking;
  onCheckOut: (id: number, obj: UpdateBookingParamsObj) => Promise<Booking>;
};

declare type BookingButtonsProps = {
  bookingId: number;
  onCheckOut: (id: number, obj: { status: BookingStatus }) => Promise<Booking>;
};

declare type CabinsTableProps = {
  searchParams: CabinsPageSearchParams;
};

declare type CheckInDataBoxProps = {
  booking: Booking;
  optionalBreakfastPrice: number;
};

declare type CheckinButtonsProps = {
  bookingId: number;
  onCheckOut: () => Promise<void>;
};

declare type UpdateSettingsFormProps = {
  prevSettings: Settings;
};

// Frontend types
declare type DateSelectorProps = {
  settings: Settings;
  bookedDates: Date[];
  cabin: Cabin;
};
