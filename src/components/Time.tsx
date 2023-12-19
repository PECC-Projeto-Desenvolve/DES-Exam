import { Typography } from '@material-tailwind/react';
import { Clock } from 'lucide-react';
import React from 'react';

const Timer = () => {
  const [time, setTime] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => {
        if (prevTime < 3599) {
          return prevTime + 1;
        } else {
          clearInterval(interval);
          return 3599;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return (
      <span>
        {minutes.toString().padStart(2, '0')}
        <strong className='animate-blink mx-[4px]'>:</strong>
        {seconds.toString().padStart(2, '0')}
      </span>
    );
  };

  return (
    <>
      <Typography variant='lead' className='flex items-center text-blue-gray-200'>
        <Clock size={20} className='mr-2'/>
        {formatTime()}</Typography>
    </>
  );
};

export default Timer;
