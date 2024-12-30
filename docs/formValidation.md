https://v0.dev/chat/CiFWYqPHKvT?b=b_0v5ES6AiBeq&f=0

'use server'

import { z } from 'zod';
import type { ActionResponse, AddressFormData } from '../types/address';

const addressSchema = z.object({
streetAddress: z.string().min(1, 'Street address is required'),
apartment: z.string().optional(),
city: z.string().min(1, 'City is required'),
state: z.string().min(1, 'State is required'),
zipCode: z.string().min(5, 'ZIP code must be at least 5 characters'),
country: z.string().min(1, 'Country is required'),
})

export async function submitAddress(prevState: ActionResponse | null, formData: FormData): Promise<ActionResponse> {
// Simulate network delay
await new Promise((resolve) => setTimeout(resolve, 1000))

try {
const rawData: AddressFormData = {
streetAddress: formData.get('streetAddress') as string,
apartment: formData.get('apartment') as string,
city: formData.get('city') as string,
state: formData.get('state') as string,
zipCode: formData.get('zipCode') as string,
country: formData.get('country') as string,
}

    // Validate the form data
    const validatedData = addressSchema.safeParse(rawData)

    if (!validatedData.success) {
      return {
        success: false,
        message: 'Please fix the errors in the form',
        errors: validatedData.error.flatten().fieldErrors,
      }
    }

    // Here you would typically save the address to your database
    console.log('Address submitted:', validatedData.data)

    return {
      success: true,
      message: 'Address saved successfully!',
    }

} catch (error) {
return {
success: false,
message: 'An unexpected error occurred',
}
}
}
'use client'

import { useActionState } from 'react';
import { submitAddress } from '../actions/address';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
Card,
CardContent,
CardDescription,
CardHeader,
CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { ActionResponse } from '../types/address';
import { CheckCircle2 } from 'lucide-react';

const initialState: ActionResponse = {
success: false,
message: '',
}

export default function AddressForm() {
const [state, action, isPending] = useActionState(submitAddress, initialState)

return (

<Card className="w-full max-w-lg mx-auto">
<CardHeader>
<CardTitle>Address Information</CardTitle>
<CardDescription>Please enter your shipping address details below.</CardDescription>
</CardHeader>
<CardContent>
<form action={action} className="space-y-6" autoComplete="on">
<div className="space-y-4">
<div className="space-y-2">
<Label htmlFor="streetAddress">Street Address</Label>
<Input
id="streetAddress"
name="streetAddress"
placeholder="123 Main St"
required
minLength={5}
maxLength={100}
autoComplete="street-address"
aria-describedby="streetAddress-error"
className={state?.errors?.streetAddress ? 'border-red-500' : ''}
/>
{state?.errors?.streetAddress && (
<p id="streetAddress-error" className="text-sm text-red-500">
{state.errors.streetAddress[0]}
</p>
)}
</div>

            <div className="space-y-2">
              <Label htmlFor="apartment">Apartment/Suite (Optional)</Label>
              <Input
                id="apartment"
                name="apartment"
                placeholder="Apt 4B"
                maxLength={20}
                autoComplete="address-line2"
                aria-describedby="apartment-error"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="New York"
                  required
                  minLength={2}
                  maxLength={50}
                  autoComplete="address-level2"
                  aria-describedby="city-error"
                  className={state?.errors?.city ? 'border-red-500' : ''}
                />
                {state?.errors?.city && (
                  <p id="city-error" className="text-sm text-red-500">
                    {state.errors.city[0]}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="state"
                  placeholder="NY"
                  required
                  minLength={2}
                  maxLength={50}
                  autoComplete="address-level1"
                  aria-describedby="state-error"
                  className={state?.errors?.state ? 'border-red-500' : ''}
                />
                {state?.errors?.state && (
                  <p id="state-error" className="text-sm text-red-500">
                    {state.errors.state[0]}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  placeholder="10001"
                  required
                  pattern="[0-9]{5}(-[0-9]{4})?"
                  maxLength={10}
                  autoComplete="postal-code"
                  aria-describedby="zipCode-error"
                  className={state?.errors?.zipCode ? 'border-red-500' : ''}
                />
                {state?.errors?.zipCode && (
                  <p id="zipCode-error" className="text-sm text-red-500">
                    {state.errors.zipCode[0]}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  placeholder="United States"
                  required
                  minLength={2}
                  maxLength={56}
                  autoComplete="country-name"
                  aria-describedby="country-error"
                  className={state?.errors?.country ? 'border-red-500' : ''}
                />
                {state?.errors?.country && (
                  <p id="country-error" className="text-sm text-red-500">
                    {state.errors.country[0]}
                  </p>
                )}
              </div>
            </div>
          </div>

          {state?.message && (
            <Alert variant={state.success ? "default" : "destructive"}>
              {state.success && <CheckCircle2 className="h-4 w-4" />}
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
          >
            {isPending ? 'Saving...' : 'Save Address'}
          </Button>
        </form>
      </CardContent>
    </Card>

)
}

export interface AddressFormData {
streetAddress: string;
apartment?: string;
city: string;
state: string;
zipCode: string;
country: string;
}

export interface ActionResponse {
success: boolean;
message: string;
errors?: {
[K in keyof AddressFormData]?: string[];
};
}
