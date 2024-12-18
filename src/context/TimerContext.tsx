// TimerContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface TimerContextProps {
  time: number;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
}

export const TimerContext = createContext<TimerContextProps>({} as TimerContextProps);

interface TimerProviderProps {
  children: ReactNode;
}

export const TimerProvider: React.FC<TimerProviderProps> = ({ children }) => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  const startTimer = () => setIsActive(true);
  const stopTimer = () => setIsActive(false);
  const resetTimer = () => {
    setTime(0);
    setIsActive(false);
  };

  return (
    <TimerContext.Provider value={{ time, startTimer, stopTimer, resetTimer }}>
      {children}
    </TimerContext.Provider>
  );
};
