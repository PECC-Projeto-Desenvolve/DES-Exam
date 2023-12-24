// Timer.tsx
import React, { useContext } from 'react';
import { TimerContext } from '../context/TimerContext';

const Timer: React.FC = () => {
  const { time } = useContext(TimerContext);

  const formattedTime = `${Math.floor(time / 60).toString().padStart(2, '0')}:${(time % 60).toString().padStart(2, '0')}`;

  return <div>{formattedTime}</div>;
};

export default Timer;
