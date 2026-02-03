import Image from 'next/image'

export const metadata = {
  title: 'Haematological Parameters | Doses',
  description:
    'Reference values for haematological parameters in paediatrics from the Malaysian Hospital Paediatric Protocols, 4th Edition.',
}

/**
 * Renders the Haematological Parameters page by displaying an image of the reference table.
 *
 * @returns A React element containing the page title and the haematological parameters image.
 */
export default function HaematologicalParametersPage() {
  return (
    <div className='w-full max-w-4xl mx-auto pb-24'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold tracking-tight'>Haematological Parameters</h1>
        <p className='text-muted-foreground mt-2'>
          Reference values from Paediatric Protocols for Malaysian Hospitals, 4th Edition.
        </p>
      </div>

      <div className='overflow-hidden rounded-lg border shadow-md'>
        <Image
          src='/photos/haematological_parameters.jpg'
          alt='Table of haematological parameters for paediatrics'
          width={1200}
          height={1600}
          className='w-full h-auto'
          priority
        />
      </div>
    </div>
  )
}
