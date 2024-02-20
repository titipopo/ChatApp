import { useState, useContext, createContext, useEffect } from 'react';

// config
import { Languages } from '../config/index'

// consts
import { Strings } from '../consts/index';

// common
import { GetStringData } from '../common/index';

export const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    GetStringData(Strings.storage_key.language)
      .then((value) => {
        if (value !== null) setLanguage(value);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });

    return () => { };
  }, []);

  return isLoading ? null : (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

const GetLan = (language) => {
  return Languages[language];
};

const UseLan = () => {
  return useContext(LanguageContext);
};

export { GetLan, UseLan };
export default LanguageProvider;
