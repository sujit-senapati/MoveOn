import React from 'react'

const CaptainDetails = () => {
  return (
      <div className='flex items-center justify-between flex-col mt-4'>
        <div className='flex justify-between items-center w-full px-5 py-3'>
          <div className='flex items-center justify-start gap-3'>
          <img className='h-12 w-12 rounded-full object-cover' src="https://media-cldnry.s-nbcnews.com/image/upload/t_fit-560w,f_auto,q_auto:best/rockcms/2024-11/20241126-elon-musk-sj-144p-c75407.jpg" alt="" />
          <h4 className='text-xl font-semibold'>Elon</h4>
        </div>
        <div className='text-right'>
          <h4 className='text-lg font-medium'>₹299.50</h4>
          <p className='text-sm font font-gray-600'>Earned</p>
        </div>
        </div>
        <div className='flex items-center justify-between w-[95%] px-8 py-3 bg-gray-100 rounded-sm'>
          <div className="text-center">
            <i className="text-2xl font-thin ri-time-fill"></i>
            <h5 className='text-sm font-bold text-gray-600'>8.7</h5>
            <p className='text-sm text-gray-600'>Hours active</p>

          </div>
          <div className="text-center">
            <i className="text-2xl font-thin ri-steering-2-fill"></i>
            <h5 className='text-sm font-bold text-gray-600'>30.66</h5>
            <p className='text-sm text-gray-600'>KMs driven</p>
          </div>
          <div className="text-center">
            <i className="text-2xl font-thin ri-file-history-fill"></i>
            <h5 className='text-sm font-bold text-gray-600'>3</h5>
            <p className='text-sm text-gray-600'>Total rides</p>
          </div>
        </div>
      </div>
  )
}

export default CaptainDetails
