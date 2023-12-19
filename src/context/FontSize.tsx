import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type FontSizeContextType = {
  fontSize: number;
  setFontSize: (size: number) => void;
};

const defaultFontSize = parseInt(localStorage.getItem('confirmedFont') || '14', 10);

const FontSizeContext = createContext<FontSizeContextType>({
  fontSize: defaultFontSize,
  setFontSize: size => {}
});

export const useFontSize = () => useContext(FontSizeContext);

interface FontSizeProviderProps {
  children: ReactNode;
}

export const FontSizeProvider: React.FC<FontSizeProviderProps> = ({ children }) => {
  const [fontSize, setFontSize] = useState(defaultFontSize);

  const updateFontSize = (newSize: number) => {
    localStorage.setItem('confirmedFont', newSize.toString());
    setFontSize(newSize);
  };

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'confirmedFont') {
        setFontSize(parseInt(event.newValue || defaultFontSize.toString(), 10));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize: updateFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};
