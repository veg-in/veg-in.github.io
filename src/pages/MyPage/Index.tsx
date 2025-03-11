// src/components/Profile.tsx
import React from 'react';
import { ChevronRight, LogOut } from 'lucide-react';
import MenuItem from './MenuItem';

const Profile: React.FC = () => {
  return (
    <div className='w-full mx-auto rounded-lg'>
      {/* 상단 프로필 정보 */}
      <div className='flex items-center text-center py-4 mb-4 border-t gap-x-4'>
        <div className='w-full'>
          <img src='/pasta.png' alt='loading...' className='w-full max-w-[200px]' />
        </div>
        <div className='w-full text-start py-4'>
          <div className='flex justify-between items-center'>
            <h1 className='text-xl font-bold'>지구사랑</h1>
            <ChevronRight size={16} />
          </div>
          <br />
          <div className='flex justify-between items-center'>
            <h1 className='text-green text-sm mb-1'>
              페스코 <span className='font-bold'>Lv.3</span>
            </h1>
            <ChevronRight size={14} />
          </div>
          <p className='text-blue text-sm mb-1'>
            그린에너지(G) <span className='font-bold'>15728</span>
          </p>
          <p className='text-gray text-xs'>지구사랑 3년차! 멋져요~!</p>
        </div>
      </div>

      <div className='text-sm border-b pb-4 mb-4'>
        <div className='flex justify-between border-b items-center mb-2'>
          <span className='text-gray-500'>이름</span>
          <span className='font-medium'>홍길동</span>
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-gray-500'>이메일</span>
          <span className='font-medium'>vegan369@gmail.com</span>
        </div>
        <p className='text-gray-400 text-xs text-right'>구글 연동 계정</p>
      </div>

      {/* 설정 메뉴 */}
      <ul className='flex flex-col flex-grow text-sm text-gray-600 w-full'>
        <MenuItem text='알림설정' />
        <MenuItem text='정보동의' />
        <MenuItem text='커뮤니티' />
        <MenuItem text='약관/이용규칙' />
        <MenuItem text='오픈소스 라이선스' />
        <MenuItem text='로그아웃/회원탈퇴' Icon={LogOut} />
      </ul>
    </div>
  );
};

export default Profile;
