import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './styles.css';

const About: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/AboutNext");
    }, 3000);

  return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
    <div className='min-h-screen grid grid-rows-[auto,1fr,auto]'>
      <div className='flex justify-center items-start w-full'>
        <img src='clouds.png' />
      </div>
      <div className='flex justify-center items-center'>
        <img src='egg.png' alt='falling egg' className='img' />
      </div>
      <div className='flex justify-center items-end'>
        <img className='w-full h-auto' src='grassland.png' />
      </div>
    </div>
    </>
  );
};

export default About;
