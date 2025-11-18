/**
 * @fileoverview Example usage of enhanced Input components
 * This file demonstrates the various input components and their features
 */

import { FloatingInput } from './floating-input'
import { Input } from './input'

/**
 * Renders example usages of Input and FloatingInput components demonstrating sizes, states, mobile keyboard types, and a sample form.
 *
 * @returns A JSX element containing the example sections and inputs.
 */
export function InputExamples() {
  return (
    <div className='space-y-8 p-8'>
      <section>
        <h2 className='mb-4 text-2xl font-bold'>Standard Input Component</h2>
        <div className='space-y-4'>
          <Input placeholder='Default input' />
          <Input placeholder='Large input' size='lg' />
          <Input placeholder='Touch-optimized input' size='touch' />
          <Input placeholder='Input with error' error='This field is required' />
          <Input placeholder='Input with success' success='Looks good!' />
          <Input placeholder='Disabled input' disabled />
        </div>
      </section>

      <section>
        <h2 className='mb-4 text-2xl font-bold'>Floating Label Input Component</h2>
        <div className='space-y-4'>
          <FloatingInput label='Email Address' type='email' />
          <FloatingInput label='Phone Number' mobileKeyboard='tel' />
          <FloatingInput label='Amount' mobileKeyboard='decimal' />
          <FloatingInput label='Full Name' size='lg' />
          <FloatingInput label='Username' error='Username is already taken' />
          <FloatingInput label='Password' type='password' success='Strong password!' />
          <FloatingInput label='Disabled Field' disabled />
        </div>
      </section>

      <section>
        <h2 className='mb-4 text-2xl font-bold'>Mobile Keyboard Types</h2>
        <div className='space-y-4'>
          <FloatingInput label='Numeric Input' mobileKeyboard='numeric' />
          <FloatingInput label='Decimal Input' mobileKeyboard='decimal' />
          <FloatingInput label='Telephone' mobileKeyboard='tel' />
          <FloatingInput label='Email' mobileKeyboard='email' />
          <FloatingInput label='URL' mobileKeyboard='url' />
          <FloatingInput label='Search' mobileKeyboard='search' />
        </div>
      </section>

      <section>
        <h2 className='mb-4 text-2xl font-bold'>Form Example</h2>
        <form className='space-y-4'>
          <FloatingInput label='First Name' required />
          <FloatingInput label='Last Name' required />
          <FloatingInput label='Email' type='email' mobileKeyboard='email' required />
          <FloatingInput label='Phone' mobileKeyboard='tel' />
          <FloatingInput label='Age' mobileKeyboard='numeric' />
          <button
            type='submit'
            className='w-full rounded-md bg-primary px-4 py-3 text-base font-medium text-primary-foreground transition-all hover:bg-primary-600'
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  )
}
