import { useState, useContext, createContext, useEffect } from 'react';

// common
import { GetStringData, StoreStringData } from '../common/index';

// consts
import { Strings } from '../consts/index';

// consts
import { Themes } from '../config/index';

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(Strings.themes.light_mode);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    GetStringData(Strings.storage_key.dark_mode)
      .then((value) => {
        if (value !== null) setTheme(value);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
    return () => { };
  }, []);

  const updateTheme = (newTheme) => {
    let mode;
    if (!newTheme) {
      mode =
        theme === Strings.themes.dark_mode
          ? Strings.themes.light_mode
          : Strings.themes.dark_mode;
      newTheme = mode;
    }

    setTheme(newTheme);
    StoreStringData(Strings.storage_key.dark_mode, newTheme);
  };

  return isLoading ? null : (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const GetTheme = (mode) => {
  return Themes[mode];
};

const UseTheme = () => {
  return useContext(ThemeContext);
};

export { GetTheme, UseTheme };
export default ThemeProvider;
