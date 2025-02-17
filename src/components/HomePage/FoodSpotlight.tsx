interface Food {
  image: string
  alt: string
}

const foods: Food[] = [
  { image: '/pasta.png', alt: '바질 페스토 파스타' },
  { image: '/icecream.png', alt: '말차 소프트콘' },
]

export default function FoodSpotlight() {
  return (
    <div className="">
      <h2 className="text-lg font-bold">이번 주 맛집탐방은 여기 어때?</h2>
      <div className="mt-4 flex justify-evenly gap-x-4">
        {foods.map((food, index) => (
          <img
            key={index}
            src={food.image}
            alt={food.alt}
            className="h-fit w-auto rounded-lg object-cover"
          />
        ))}
      </div>
    </div>
  )
}
