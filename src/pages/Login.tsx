import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { useLogin } from '@/hooks/useLogin';
export default function Login() {
  const { loginWith } = useLogin();

  return (
    <div className='flex size-full flex-col items-center justify-center p-6 text-[14px]'>
      <div className='text-center'>
        <h1 className='mb-2 text-3xl font-semibold text-green-600'>Veg-in</h1>
        <img src='/logo.png' alt='logo' className='mx-auto size-[50px]' />
      </div>

      <h2 className='mt-4 text-lg font-semibold'>로그인 해주세요</h2>
      <p className='text-sm text-gray-500'>Google / Apple / Kakao / Naver</p>

      <div className='my-4 w-full max-w-sm border-t border-gray-300'></div>

      <div className='w-full max-w-sm space-y-3'>
        <Button
          variant='outline'
          className='flex w-full items-center justify-center border-gray-300'
          onClick={() => loginWith('Google')}
        >
          <FcGoogle className='mr-2' />
          Continue with Google
        </Button>
        <Button
          variant='outline'
          className='flex w-full items-center justify-center border-gray-300'
          onClick={() => loginWith('Apple')}
        >
          <FaApple className='mr-2' />
          Continue with Apple
        </Button>
        <Button
          className='flex w-full items-center justify-center border-gray-300'
          variant='outline'
          onClick={() => loginWith('Kakao')}
        >
          Continue with Kakao
        </Button>
        <Button
          className='flex w-full items-center justify-center border-gray-300'
          variant='outline'
          onClick={() => loginWith('Naver')}
        >
          Continue with Naver
        </Button>
      </div>

      <p className='mt-4 text-center text-xs text-gray-500'>
        By clicking continue, you agree to our{' '}
        <span className='font-semibold text-black'>Terms of Service</span> and{' '}
        <span className='font-semibold text-black'>Privacy Policy</span>
      </p>
    </div>
  );
}
