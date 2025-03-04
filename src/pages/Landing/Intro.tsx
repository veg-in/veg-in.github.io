import { HiOutlineChevronDown } from "react-icons/hi";
import { useState } from 'react';

export default function Intro() {

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
      setIsVisible(!isVisible);
    };

  return (
    <div className="relative w-full h-auto bg-[#EBF3FE]">
      <div className="mb-13 mt-15 ml-8">
        <h1 className="font-bold text-5xl mb-2">PAMCHU</h1>
        <h2 className="font-bold text-xl mb-2">팜쭈</h2>
        <span className="text-base">싱크로나이즈드 비행학과 25학번 새내기<br />
        대학교 개강을 앞두고 고민이 많ㄷr...</span>
      </div>

      <div className="absolute w-full h-68 bg-[#C9DDFB]"></div>
      <img src="/pamchu.png" className="relative w-80 object-cover ml-50 bottom-20" />

      <div className="flex items-center justify-center mt-[-70px]">
        <button className="p-3 text-[#0080FF]" onClick={toggleVisibility}>
          <HiOutlineChevronDown className="w-15 h-15"/>
        </button>
      </div>

      {isVisible && (
      <div>
        <div className="flex flex-col items-center justify-center ml-10 mr-10">
          <p>2025년 3월, 어린 독수리 팜쭈는 백양로 아스팔트에 불시착한 <br />
          후, 팜희를 사부로 삼아 대학 생활을 배우기 시작한다. 끝없는 <br />
          호기심과 탐구욕으로 연세대 곳곳을 누비는 팜쭈! <br /> <br />
          팜희는 팜쭈의 열정에 감동받고, 싱크로나이즈드 비행학과 과대 <br />
          로서 이 친구를 완벽한 연대생으로 만들어주기 위해 후배의 대학 <br />
          생활을 앞장서서 돕기 시작한다. 합응, 아카라카, 연고전 등등을 <br />
          거치며 여러 퀘스트들을 하나하나 깨나가는데... </p>
        </div>
        <div className="flex mt-15">
          <div className="ml-7">
            <img src="Pamhi.png" className="flex-shrink-0 w-31" />
          </div>
          <div className="relative mt-1">
            <img src="chat.png" className="flex-shrink-0 w-90 ml-1" />
            <div className="absolute top-3 ml-13 text-sm">안녕! 나는 팜쭈의 짝선 독팜희야. <br />
            다시 만나서 반가워. 설마 벌써 나를 까먹진 <br />
            않았지?! 나는 연세대학교 싱크로나이즈드 <br />
            비행학과 24학번이고, 올해 쪼끔 더 커서 키도 <br />
            40cm나 되는 선배 독수리라구! <br />
            그럼 모두 우리 후배 팜쭈 잘 부탁해💙🩵</div>
          </div>
        </div>
        <div className="font-bold text-sm ml-[32px] mt-[-12px]">
          <span>독팜희 / 팜쭈 선배</span>
        </div>
      </div>
      )}

      <div className="flex items-center justify-center mt-20 mb-10">
        <img src="blocklogo.png" className="w-30 object-cover" />
      </div>
    </div>
  );
}
