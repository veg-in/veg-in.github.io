import { useNavigate } from 'react-router'

export default function Login() {
  const navigate = useNavigate()

  return (
    <div className="base-layout mx-auto mt-4 flex flex-col">
      <img
        src="/logo.png" // Replace with actual image path
        alt="logo"
        width={60}
        height={60}
        className="rounded-full"
      />
      <img
        src="/banner.png" // Replace with actual image path
        alt="Banner"
        className="mt-6 w-full"
      />
      <div className="mt-6 rounded-xl bg-gray-200 p-4 text-center">
        <p className="text-gray-600">광고 영역</p>
        <p className="font-semibold text-gray-800">(식당 / 식품 / 소개팅 후기)</p>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-bold">인기 게시글</h3>
        <ul className="mt-2 space-y-2">
          <li className="text-gray-700">서울 인근 채식 식당 중에 주차 되는 곳은....</li>
          <li className="text-gray-700">지인 소개팅 받을 때 비건이라고 이야기....</li>
          <li className="text-gray-700">채식 토마토 스튜 해봤는데, 연두보다 더...</li>
        </ul>
      </div>
    </div>
  )
}
