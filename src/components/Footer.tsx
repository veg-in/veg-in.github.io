import { Link } from 'react-router-dom';
import { FaEnvelope, FaFilm, FaHeart, FaHome, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <div className='fixed inset-x-0 bottom-0 mx-auto flex h-[60px] w-full max-w-[600px] items-center justify-between px-5 text-black'>
      <Link to='/home' className='flex flex-col items-center'>
        <FaHome size={24} />
      </Link>
      <Link to='/location' className='flex flex-col items-center'>
        <FaMapMarkerAlt size={24} />
      </Link>
      <Link to='/movies' className='flex flex-col items-center'>
        <FaFilm size={24} />
      </Link>
      <Link to='/messages' className='flex flex-col items-center'>
        <FaEnvelope size={24} />
      </Link>
      <Link to='/favorites' className='flex flex-col items-center'>
        <FaHeart size={24} />
      </Link>
    </div>
  );
}
