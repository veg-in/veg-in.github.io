import Introduction from '@/components/LandingPage/Introduction'
import Landing from '@/components/LandingPage/Landing'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

function Index() {
  const [showIntroduction, setShowIntroduction] = useState(false)
  const duration = 2000
  const navigate = useNavigate()

  const handleComplete = () => {
    navigate('/login')
  }
  useEffect(() => {
    const switchTimer = setTimeout(() => {
      setShowIntroduction(true)
    }, duration + 1000)

    return () => {
      clearTimeout(switchTimer)
    }
  }, [])

  return (
    <>
      {!showIntroduction ? (
        <Landing onFadeComplete={() => setShowIntroduction(true)} />
      ) : (
        <Introduction onComplete={handleComplete} />
      )}
    </>
  )
}

export default Index
