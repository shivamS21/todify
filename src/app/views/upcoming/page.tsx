'use client';

import Overdue from '@/app/components/Cards/Overdue';
import React, { useState } from 'react'


const Upcoming = () => {
  return (
    <div className='mt-5 flex flex-col gap-1'>
      <b className="text-[26px] flex pb-2">Upcoming</b>
      
      <Overdue/>
    </div>
  )
}

export default Upcoming