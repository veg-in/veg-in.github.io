import { useEffect, useState } from 'react'

interface LandingProps {
  duration?: number
  onFadeComplete: () => void // 페이드아웃 완료 시 실행할 함수
}

function Landing({ duration = 2000, onFadeComplete }: LandingProps) {
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true)
    }, duration) // 지정된 시간 후 페이드아웃

    const removeTimer = setTimeout(() => {
      onFadeComplete() // 페이드아웃 완료 후 실행
    }, duration + 1000) // 페이드아웃 후 1초 뒤 실행

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [duration, onFadeComplete])

  return (
    <main
      className={`flex size-full flex-col justify-center gap-y-10 transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="text-green items-center justify-center text-center text-[40px] font-semibold">
        <p>비긴</p>
        <p>Veg-in</p>
      </div>
      <img className="mx-auto size-[95px]" src="/logo.png" alt="Loading.." />
      <div className="items-center justify-center text-center text-[20px] font-semibold">
        <p>
          <span className="text-green">자연</span>을 사랑하고
        </p>
        <p>
          <span className="text-green">스스로</span>를 사랑하는
        </p>
        <br />
        <p>
          당신의
          <span className="text-yellow"> 따스한 걸음</span>을
        </p>
        <p>응원합니다</p>
      </div>
    </main>
  )
}

export default Landing
