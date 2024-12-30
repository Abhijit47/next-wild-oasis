import { z } from 'zod';

// Define the password validation schema
const passwordSchema = z.string().refine(
  (value) => {
    // Check for minimum length
    const hasMinLength = value.length >= 8;
    // Check for at least one uppercase letter
    const hasUppercase = /[A-Z]/.test(value);
    // Check for at least one lowercase letter
    const hasLowercase = /[a-z]/.test(value);
    // Check for at least one digit
    const hasDigit = /\d/.test(value);
    // Check for at least one special character
    const hasSpecialChar = /[@$!%*?&]/.test(value);

    return (
      hasMinLength && hasUppercase && hasLowercase && hasDigit && hasSpecialChar
    );
  },
  {
    message:
      'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
  }
);

export const createUserSchema = z.object({
  fullname: z.string().min(3, 'Full name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: passwordSchema,
  confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
});

export const addressSchema = z.object({
  streetAddress: z.string().min(1, 'Street address is required'),
  apartment: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(5, 'ZIP code must be at least 5 characters'),
  country: z.string().min(1, 'Country is required'),
});

export const updateSettingsSchema = z.object({
  minBookingLength: z
    .number()
    .min(1, 'Minimum booking length must be at least 1')
    .max(3, 'Minimum booking length must be at most 3'),
  maxBookingLength: z
    .number()
    .min(1, 'Maximum booking length must be at least 1')
    .max(100, 'Maximum booking length must be at most 100'),
  maxGuestsPerBooking: z
    .number()
    .min(1, 'Maximum guests per booking must be at least 1')
    .max(10, 'Maximum guests per booking must be at most 10'),
  breakfastPrice: z
    .number()
    .min(1, 'Breakfast price must be at least 1')
    .max(80, 'Breakfast price must be at most 80'),
});

// Define the maximum file size (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// Define the accepted image MIME types
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

// Define a schema for the file (avatar)
const fileSchema = z.object({
  size: z.number().max(MAX_FILE_SIZE, 'File size must be less than 10MB'), // Max size 10MB
  type: z.enum(ACCEPTED_IMAGE_TYPES as [string, ...string[]]),
  name: z.string().min(1, 'File name cannot be empty'),
});

export const updateUserSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  avatar: z.instanceof(File).refine((file) => {
    const { size, type, name } = file;
    const fileValidation = fileSchema.safeParse({ size, type, name });
    if (!fileValidation.success) {
      throw new Error(fileValidation.error.errors[0].message);
    }
    return true;
  }),
});

// Password validation regex
const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

export const updatePasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(
        passwordRegex,
        'Password must contain at least one uppercase letter, one number, and one special character'
      ),
    confirmPassword: z
      .string()
      .min(8, 'Confirm Password must be at least 8 characters long')
      .regex(
        passwordRegex,
        'Confirm Password must contain at least one uppercase letter, one number, and one special character'
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'], // This will point the error to the confirmPassword field
  });

export const createCabinSchema = z.object({
  name: z
    .string()
    .min(3, 'Cabin name must have 3 characters')
    .max(255, 'Cabin name must have 255 characters'),
  maxCapacity: z.number().min(1, 'Max capacity must be at least 1'),
  regularPrice: z.number().min(1, 'Regular price must be at least 1'),
  discount: z.number().min(1, 'Discount must be at least 1'),
  description: z
    .string()
    .min(3, 'Description must contain 3 characters')
    .max(1000, 'Description must contain 1000 characters'),
  image: z.instanceof(File).refine((file) => {
    const { size, type, name } = file;
    const fileValidation = fileSchema.safeParse({ size, type, name });
    if (!fileValidation.success) {
      throw new Error(fileValidation.error.errors[0].message);
    }
    return true;
  }),
});

export const updateCabinSchema = z.object({
  name: z
    .string()
    .min(3, 'Cabin name must have 3 characters')
    .max(255, 'Cabin name must have 255 characters'),
  maxCapacity: z.number().min(1, 'Max capacity must be at least 1'),
  regularPrice: z.number().min(1, 'Regular price must be at least 1'),
  discount: z.number().min(1, 'Discount must be at least 1'),
  description: z
    .string()
    .min(3, 'Description must contain 3 characters')
    .max(1000, 'Description must contain 1000 characters'),
  image: z.instanceof(File).refine((file) => {
    const { size, type, name } = file;
    const fileValidation = fileSchema.safeParse({ size, type, name });
    if (!fileValidation.success) {
      throw new Error(fileValidation.error.errors[0].message);
    }
    return true;
  }),
});

export const bookingSchema = z.object({
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'startDate must be a valid date string',
  }),
  endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'endDate must be a valid date string',
  }),
  numNights: z.number(),
  cabinPrice: z.number(),
  cabinId: z.number(),
  numGuests: z.number().min(1, 'Number of guests must be at least 1'),
  observations: z
    .string()
    .min(3, 'Observations must be at least 10 characters')
    .max(1000, 'Observations must be at most 1000 characters'),
});
