// Timer.tsx
import React, { useContext } from 'react';
import { TimerContext } from '../context/TimerContext';

const Timer: React.FC = () => {
  const { time } = useContext(TimerContext);


  return <div className='flex items-center justify-center text-white'>{Math.floor(time / 60).toString().padStart(2, '0')} <p>:</p> {(time % 60).toString().padStart(2, '0')}</div>;
};

export default Timer;
