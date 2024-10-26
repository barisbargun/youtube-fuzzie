import { SignIn } from '@clerk/nextjs'

const page = () => {
  return (
    <div className="flex-center min-h-screen">
      <SignIn />
    </div>
  )
}

export default page
