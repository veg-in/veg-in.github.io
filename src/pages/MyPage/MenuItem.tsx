// src/components/MenuItem.tsx
import React from 'react';
import { ChevronRight } from 'lucide-react';

interface MenuItemProps {
  text: string;
  Icon?: React.ComponentType<{ size?: number }>;
  onClick?: () => void;
}

export default function MenuItem({ text, Icon, onClick }: MenuItemProps) {
  return (
    <li
      className='flex items-center justify-between h-full py-2 border-b cursor-pointer w-full'
      onClick={onClick}
    >
      <span className='flex-grow'>{text}</span>
      {Icon ? <Icon size={16} /> : <ChevronRight size={16} />}
    </li>
  );
}
