import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FcGoogle } from 'react-icons/fc'
import { FaApple } from 'react-icons/fa'
import { useNavigate } from 'react-router'

export default function Login() {
  const navigate = useNavigate()

  return (
    <div className="base-layout flex flex-col items-center justify-center px-6 text-[14px]">
      <div className="mb-6 text-center">
        <h1 className="text-green mb-3 text-3xl font-semibold">Veg-in</h1>
        <img src="/logo.png" alt="loading..." className="mx-auto h-[50px] w-[50px]" />
      </div>

      <h2 className="text-lg font-semibold">로그인 해주세요</h2>
      <p className="text-sm text-gray-500">Google / Apple / Kakao / Naver</p>

      <div className="mt-4 w-full max-w-sm ">
        <Input type="email" placeholder="email@domain.com" className="w-full" />
      </div>

      <Button
        className="mt-3 w-full max-w-sm bg-black text-white"
        onClick={() => {
          navigate('/home')
        }}
      >
        Continue
      </Button>

      <div className="my-4 flex w-full max-w-sm items-center">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-3 text-sm text-gray-500">or</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      <div className="w-full max-w-sm space-y-2">
        <Button
          variant="outline"
          className="flex w-full items-center"
          onClick={() => {
            navigate('/home')
          }}
        >
          <FcGoogle className="mr-2" />
          Continue with Google
        </Button>
        <Button
          className="flex w-full items-center bg-black text-white"
          onClick={() => {
            navigate('/home')
          }}
        >
          <FaApple className="mr-2" />
          Continue with Apple
        </Button>
      </div>

      <p className="mt-4 text-center text-xs text-gray-500">
        By clicking continue, you agree to our{' '}
        <span className="font-semibold text-black">Terms of Service</span> and{' '}
        <span className="font-semibold text-black">Privacy Policy</span>
      </p>
    </div>
  )
}
