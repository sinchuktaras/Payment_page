import React from "react";
import PaymentForm from "./PaymentForm";
import OrderSummary from "./OrderSummary";
import { useTranslation, LanguageSwitcher } from "../TranslationContext";
import "./CheckoutPage.css";

/**
 * CheckoutPage Component
 * 
 * Main checkout interface that coordinates the payment form and order summary.
 * Handles the overall layout and integration of other components.
 */
const CheckoutPage = () => {
  // Get translation function from context
  const { t } = useTranslation();
  
  return (
    <div className="checkout-page">
      <div className="checkout-container">
        {/* Language switcher in the top-right corner */}
        <div className="language-switcher-container">
          <LanguageSwitcher />
        </div>
        
        {/* Left side: Payment form with credit card input */}
        <div className="payment-section">
          <PaymentForm t={t} />
        </div>
        
        {/* Right side: Order summary with product details */}
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

      {/* Footer: Powered by Solid text */}
      <div className="powered-by-container">
        <p className="powered-by-text">Powered by <span className="solid-text">Solid</span></p>
      </div>
    </div>
  );
};

export default CheckoutPage;