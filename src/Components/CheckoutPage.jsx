// CheckoutPage.jsx
import React from "react";
import PaymentForm from "./PaymentForm";
import OrderSummary from "./OrderSummary";
import { useTranslation, LanguageSwitcher } from "../TranslationContext";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="language-switcher-container">
          <LanguageSwitcher />
        </div>
        <div className="payment-section">
          {/* Pass the translation function to PaymentForm */}
          <PaymentForm t={t} />
        </div>
        <div className="summary-section">
          <OrderSummary 
            productName={t('productName')}
            productDescription={t('productSubtitle')}
            price={t('price')}
            freeTrial={t('freeTrial')}
            disclaimer={t('disclaimer')}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;