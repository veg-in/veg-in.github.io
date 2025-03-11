import { Link } from 'react-router-dom'

interface Post {
  title: string
  category: string
  to: string
}

const posts: Post[] = [
  { title: '서울 인근 채식 식당 중에 주차 되는 곳은....', category: '자유게시판', to: '/sadf' },
  { title: '지인 소개팅 받을 때 비건이라고 이야기...', category: '비밀게시판', to: '/vsa' },
  { title: '채식 토마토 스튜 해봤는데, 연두보다 더...', category: '도전요리사', to: '/sv' },
  { title: '이번주에 강서구 A 맛집 탐방 가실분 모...', category: '강남구모임', to: '/asdf' },
]

export default function PostList() {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold">인기 게시글</h2>
      <ul className="mt-2 space-y-2">
        {posts.map((post, index) => (
          <Link key={index} to={post.to} className="flex justify-between text-sm">
            <span className="w-3/4 truncate">{post.title}</span>
            <span className="text-gray-500">{post.category}</span>
          </Link>
        ))}
      </ul>
    </div>
  )
}
