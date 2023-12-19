import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

/**
 * Context for managing and accessing font size settings.
 * Provides a font size value and a function to update this value.
 *
 * @typedef {Object} FontSizeContextType
 * @property {number} fontSize - The current font size value.
 * @property {function} setFontSize - Function to update the font size.
 */
type FontSizeContextType = {
  fontSize: number;
  setFontSize: (size: number) => void;
};

/**
 * Default font size, retrieved from localStorage or set to a default value.
 * Parses the 'confirmedFont' item from localStorage to get the previously confirmed font size,
 * or defaults to 14 if not available.
 */
const defaultFontSize = parseInt(localStorage.getItem('confirmedFont') || '14', 10);

/**
 * FontSizeContext is a React context for providing and consuming font size settings.
 * It holds the current font size and a function to update the font size.
 */
const FontSizeContext = createContext<FontSizeContextType>({
  fontSize: defaultFontSize,
  setFontSize: size => {}
});

/**
 * Custom hook for accessing font size context.
 * This hook provides an easy way to access and set the font size from any component.
 *
 * @returns {FontSizeContextType} The font size context value.
 */
export const useFontSize = () => useContext(FontSizeContext);

/**
 * Defines the prop types for the FontSizeProvider component.
 *
 * @typedef {Object} FontSizeProviderProps
 * @property {ReactNode} children - Children components that will be wrapped by the FontSizeProvider.
 */
interface FontSizeProviderProps {
  children: ReactNode;
}

/**
 * Provider component for font size context.
 * This component sets up the font size context and manages the state and persistence of font size settings.
 *
 * @param {object} props - Props for FontSizeProvider.
 * @param {ReactNode} props.children - Children components that will consume the font size context.
 * @returns {React.FC<FontSizeProviderProps>} A React functional component providing the font size context.
 *
 * @component
 */
export const FontSizeProvider: React.FC<FontSizeProviderProps> = ({ children }) => {
  const [fontSize, setFontSize] = useState(defaultFontSize);

  /**
 * Updates and persists the font size setting.
 * This function updates the font size state and saves the new value in localStorage.
 *
 * @param {number} newSize - The new font size to be set.
 */
  const updateFontSize = (newSize: number) => {
    localStorage.setItem('confirmedFont', newSize.toString());
    setFontSize(newSize);
  };

  /**
 * Effect hook to synchronize font size state with localStorage.
 * Listens for storage events and updates the font size state if the related localStorage item changes.
 */
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
