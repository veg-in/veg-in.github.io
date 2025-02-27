import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export function Button({ children, onClick, className }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center border border-black border-[1.5px] bg-[#FFCE00] rounded-2xl border-black w-[400px] h-[40px] ${className}`}>
        {children}
    </button>
  );
}

const Quiz = () => {
  return (
    <>
    <div className="mt-20 flex flex-col gap-y-40 justify-center items-center">
      <div>1/11</div>
      <div className="font-bold">대학생활 첫 걸음! 수강신청, 어떻게 할래?</div>
      <div className="flex flex-col gap-y-15">
        <Button onClick={() => console.log("1")}>21학점 듣고 조기졸업🏃</Button>
        <Button onClick={() => console.log("2")}>15학점 듣고 초과학기📈</Button>
      </div>
    </div>
    </>
  );
};

export default Quiz;
