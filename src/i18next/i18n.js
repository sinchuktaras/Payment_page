import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
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
      disclaimer: "You'll have your Plan Pro during 1 year. After this period, your plan will be automatically renewed with its original price without any discounts applied."
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
      disclaimer: "Ваш план Pro діятиме протягом 1 року. Після цього він буде автоматично поновлений за початковою ціною без знижок."
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
