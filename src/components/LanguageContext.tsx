import { createContext, useContext, useState, ReactNode } from "react";

interface LanguageContextType {
    language: "fr" | "en";
    setLanguage: (language: "fr" | "en") => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<"fr" | "en">('fr');
    return <LanguageContext.Provider value={{ language, setLanguage }}>
        {children}
    </LanguageContext.Provider>
}

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("Error in context ");
    }
    return context;
}