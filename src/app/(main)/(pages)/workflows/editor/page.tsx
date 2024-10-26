import { redirect } from 'next/navigation'

const page = () => {
  redirect('/workflows?openDialog=true')
}

export default page
