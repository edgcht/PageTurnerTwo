import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'en' | 'fr';

const translations = {
  en: {
    home: 'Home',
    discover: 'Discover',
    write: 'Write',
    community: 'Community',
    signIn: 'Sign In',
    logout: 'Logout',
    heroTitle: 'Where Stories Come to Life',
    heroWriteCTA: 'Start Writing Today',
    heroDiscoverCTA: 'Discover Amazing Stories',
    createAccount: 'Create Account',
    pleaseWait: 'Please wait...',
    noAccount: "Don't have an account? Sign up",
    haveAccount: 'Already have an account? Sign in'
  },
  fr: {
    home: 'Accueil',
    discover: 'Découvrir',
    write: 'Écrire',
    community: 'Communauté',
    signIn: 'Se connecter',
    logout: 'Déconnexion',
    heroTitle: 'Là où les histoires prennent vie',
    heroWriteCTA: "Commencez à écrire aujourd'hui",
    heroDiscoverCTA: 'Découvrez des histoires incroyables',
    createAccount: 'Créer un compte',
    pleaseWait: 'Veuillez patienter...',
    noAccount: "Vous n'avez pas de compte ? Inscrivez-vous",
    haveAccount: 'Vous avez déjà un compte ? Connectez-vous'
  }
};

type TranslationKey = keyof typeof translations['en'];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return saved === 'fr' || saved === 'en' ? (saved as Language) : 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: TranslationKey) => translations[language][key];
  const value = { language, setLanguage, t };
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

