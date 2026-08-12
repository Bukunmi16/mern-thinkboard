import { CloudLightningIcon, ZapIcon } from 'lucide-react'
import React from 'react'

const RateLimited = () => {
  return (
    <div className='p-8'>
        <div className='rounded-lg p-3 mx-auto max-w-7xl flex items-center bg-primary-content'>
            <div className='m-5 bg-primary rounded-full p-2'>
            <ZapIcon size={40} color='white' />
            </div>
            <div className=' my-3 text-white'>
                <h2 className='font-bold text-[12px] sm:text-sm'>Rate Limit Reached</h2>
                <p className='text-[10px] sm:text-sm font-bold'>You've made too many requests in a short period. Please wait a moment.</p>
                <p className='text-[10px] sm:text-[12px]'>Try again in a few seconds for the best experience.</p>
            </div>
        </div>
    </div>
  )
}

export default RateLimited