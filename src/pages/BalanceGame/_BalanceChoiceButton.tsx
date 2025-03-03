// 버튼 컴포넌트 분리
interface BalanceChoiceButtonProps {
  label: string;
  onClick: () => void;
}
export default function BalanceChoiceButton({ label, onClick }: BalanceChoiceButtonProps) {
  return (
    <button
      className='cursor-pointer py-2 w-96 border-2 border-black bg-yellow-400 active:bg-yellow-700 rounded-lg'
      onClick={onClick}
    >
      {label}
    </button>
  );
}
