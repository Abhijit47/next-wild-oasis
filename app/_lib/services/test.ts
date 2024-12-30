'use server';

import { addressSchema } from '../schemas';

export async function submitAddress(
  prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const rawData: AddressFormData = {
      streetAddress: formData.get('streetAddress') as string,
      apartment: formData.get('apartment') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      zipCode: formData.get('zipCode') as string,
      country: formData.get('country') as string,
    };

    // Validate the form data
    const validatedData = addressSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        message: 'Please fix the errors in the form',
        errors: validatedData.error.flatten().fieldErrors,
        inputs: rawData,
      };
    }

    // Here you would typically save the address to your database
    console.log('Address submitted:', validatedData.data);

    return {
      success: true,
      message: 'Address saved successfully!',
    };
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return {
      success: false,
      message: 'An unexpected error occurred',
    };
  }
}
