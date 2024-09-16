import { redirect } from 'next/navigation'
import React, { useEffect } from 'react'

const page = () => {
  redirect('/workflows?openDialog=true')
}

export default page
