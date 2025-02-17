import { motion } from 'framer-motion'

const textVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.5, duration: 1, ease: 'easeOut' },
  }),
}

function Introduction({ onComplete }: { onComplete?: () => void }) {
  const texts = [
    '오늘도',
    <br key="br1" />,
    <>
      <span className="text-green">Veg-in</span>과 함께
    </>,
    <br key="br2" />,
    <>
      <span className="text-yellow">건강</span>하고
    </>,
    <>
      <span className="text-yellow">행복</span>한
    </>,
    <br key="br3" />,
    '하루를',
    '시작하세요!',
  ]

  return (
    <main className="flex size-full flex-col items-center justify-center">
      <motion.div
        className="text-start text-[36px] font-semibold"
        initial="hidden"
        animate="visible"
      >
        {texts.map((text, index) => (
          <motion.p
            key={index}
            custom={index}
            variants={textVariants}
            onAnimationComplete={index === texts.length - 1 ? onComplete : undefined}
          >
            {text}
          </motion.p>
        ))}
      </motion.div>
    </main>
  )
}

export default Introduction
