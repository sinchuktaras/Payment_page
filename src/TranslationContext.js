
// TranslationContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

// Your existing translations
const translations = {
  en: {
    translation: {
      checkout: "Checkout",
      freeTrial: "5 days free",
      price: "then 299.99 UAH per 14 days",
      pay: "Pay 299.99 UAH",
      orderInfo: "Order info",
      description: "Description",
      productName: "Lamel Professional Smart Skin Compact Powder",
      productSubtitle: "Face powder",
      cardNumber: "Card Number",
      expDate: "Expiration Date",
      cvc: "CVC",
      or: "or pay with card",
      disclaimerPart1: "You'll have your ",
      disclaimerSB1: "Plan Pro during 1 year.",
      disclaimerPart2: " After this preriod of time, your plan will be ",
      disclaimerSB2: "automatically renewed ",
      disclaimerPart3: "with its original price without any discounts applied.",
      paymentProcessing: "Processing payment",
      paymentSuccess: "✔ Payment successful! Thank you.",
      pay299: "Pay 299.99 UAH",
      cardNumberError: "Please enter a valid 16-digit card number",
      expiryError: "Please enter a valid expiry date (MM/YY)",
      monthError: "Month must be between 01-12",
      cvcError: "CVC must be 3 digits",
      cvcHelp: "CVC is the 3-digit security code on the back of your card"
    }
  },
  uk: {
    translation: {
      checkout: "Оформлення",
      freeTrial: "5 днів безкоштовно",
      price: "далі 299.99 грн кожні 14 днів",
      pay: "Сплатити 299.99 грн",
      orderInfo: "Інформація про замовлення",
      description: "Опис",
      productName: "Lamel Professional Smart Skin Compact Powder",
      productSubtitle: "Пудра для лиця",
      cardNumber: "Номер картки",
      expDate: "Термін дії",
      cvc: "CVC",
      or: "або оплатити карткою",
      disclaimerPart1: "Ваш ",
      disclaimerSB1: "план Pro діятиме протягом 1 poку. ",
      disclaimerPart2: " Після цього він буде ",
      disclaimerSB2: "автоматично поновлений ",
      disclaimerPart3: "за початковою ціною без знижок.",
      paymentProcessing: "Обробка платежу",
      paymentSuccess: "✔ Дякуємо! Платіж успішний.",
      pay299: "Сплатити 299.99 грн",
      cardNumberError: "Будь ласка, введіть дійсний 16-значний номер картки",
      expiryError: "Будь ласка, введіть дійсну дату закінчення терміну дії (ММ/РР)",
      monthError: "Місяць має бути між 01-12",
      cvcError: "CVC має бути 3 цифри",
      cvcHelp: "CVC - це 3-значний код безпеки на звороті картки"
    }
  }
};

// Create the context
const TranslationContext = createContext();

// Create a provider component
export function TranslationProvider({ children }) {
  // Get saved language or default to English
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'en';
  });

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('language', language);
    // Update the document's lang attribute
    document.documentElement.lang = language;
  }, [language]);

  // Function to change the language
  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };

  // Get text in current language
  const t = (key) => {
    return translations[language]?.translation?.[key] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

// Custom hook to use the translation context
export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}

// LanguageSwitcher.js - Component for language switching buttons
export function LanguageSwitcher() {
  const { language, changeLanguage } = useTranslation();
  
  return (
    <div className="language-switcher">
      <button 
        onClick={() => changeLanguage('en')}
        className={`lang-btn ${language === 'en' ? 'active' : ''}`}
      >
        Eng
      </button>
      <button 
        onClick={() => changeLanguage('uk')}
        className={`lang-btn ${language === 'uk' ? 'active' : ''}`}
      >
        Укр
      </button>
    </div>
  );
}