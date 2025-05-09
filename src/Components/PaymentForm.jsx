import React, { useState } from "react";
import "./PaymentForm.css";
import { useTranslation } from "../TranslationContext";

/**
 * PaymentForm Component
 * 
 * This component handles the credit card payment form functionality including
 * validation, formatting, and submission processing.
 */
const PaymentForm = () => {
  const { t } = useTranslation();
  
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const [showCvcInfo, setShowCvcInfo] = useState(false);
  
  const toggleCvcInfo = () => {
    setShowCvcInfo(!showCvcInfo);
  };
  
  const [errors, setErrors] = useState({
    cardNumber: "",
    expiry: "",
    cvc: ""
  });

  /**
   * Constanst below handle the card info input, with formating and validation
   */
  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    
    if (value.length <= 16) {
      setCardNumber(value.replace(/(.{4})/g, '$1 ').trim()); // Format with spaces every 4 digits
      
      if (errors.cardNumber && value.length === 16) {
        setErrors({ ...errors, cardNumber: "" });
      }
    }
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    
    if (value.length > 4) {
      value = value.slice(0, 4);
    }
    
    // Format as MM/YY
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    
    setExpiry(value);
    
    if (errors.expiry && value.length === 5) {
      setErrors({ ...errors, expiry: "" });
    }
  };

  const handleCvcChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    
    if (value.length <= 3) {
      setCvc(value);
      
      if (errors.cvc && value.length === 3) {
        setErrors({ ...errors, cvc: "" });
      }
    }
  };

  /**
   * Validates all form fields before submission
   * @returns {boolean} True if form is valid, false otherwise
   */
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    
    // Validate card number
    if (!cardNumber || cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = t('cardNumberError');
      isValid = false;
    }
    
    // Validate expiry
    if (!expiry || expiry.length !== 5) {
      newErrors.expiry = t('expiryError');
      isValid = false;
    } else {
      const [month, year] = expiry.split('/');
      if (parseInt(month) < 1 || parseInt(month) > 12) {
        newErrors.expiry = t('monthError');
        isValid = false;
      }
    }
    
    // Validate CVC
    if (!cvc || cvc.length !== 3) {
      newErrors.cvc = t('cvcError');
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  /**
   * Handles form submission
   * Simulates payment processing with timeout
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);
    setMessage("");

    setTimeout(() => {
      setIsProcessing(false);
      setMessage(t('paymentSuccess'));
      
      // Clear fields after successful payment
      setCardNumber("");
      setExpiry("");
      setCvc("");
    }, 2000);
  };

  return (
    <div className="payment-container">
      {/* Header with back button */}
      <div className="checkout-header">
        <svg className="back-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h2>Checkout</h2>
      </div>
      
      {/* Pricing information */}
      <div className="pricing-info">
        <h3><span className="semi-bold"> {t('freeTrial')} </span></h3>
        <p> {t('price')} </p>
      </div>

      {/* Apple Pay button */}
      <button className="apple-pay">
        <i className="fab fa-apple"></i>
        <span>Pay</span>
      </button>

      {/* Divider between payment options */}
      <div className="divider">
        <span>{t('or')}</span>
      </div>

      {/* Credit card payment form */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>{t('cardNumber')}</label>
          <input
            type="text"
            placeholder="1234 1234 1234 1234"
            value={cardNumber}
            onChange={handleCardNumberChange}
            className={errors.cardNumber ? "error" : ""}
          />
          {errors.cardNumber && <div className="error-message">{errors.cardNumber}</div>}
        </div>
        
        {/* Inline fields for expiry and CVC */}
        <div className="inline-fields">
          <div className="form-group">
            <label>{t('expDate')}</label>
            <input
              type="text"
              placeholder="MM/YY"
              value={expiry}
              onChange={handleExpiryChange}
              className={errors.expiry ? "error" : ""}
            />
            {errors.expiry && <div className="error-message">{errors.expiry}</div>}
          </div>
          <div className="form-group">
            <label>{t('cvc')}</label>
            <div className="cvc-container">
              <input
                type="text"
                placeholder="•••"
                value={cvc}
                onChange={handleCvcChange}
                className={errors.cvc ? "error" : ""}
              />

              {/* CVC help tooltip */}
              <div className="info-button-container">
                <button type="button" className="info-button" onClick={toggleCvcInfo}>
                  <i className="fas fa-info-circle"></i>
                </button>
                {showCvcInfo && (
                  <span className="info-tooltip">
                    {t('cvcHelp')}
                  </span>
                )}
              </div>
            </div>
            {errors.cvc && <div className="error-message">{errors.cvc}</div>}
          </div>
        </div>
        
        {/* Submit button with loading state */}
        <button className="pay-btn" type="submit" disabled={isProcessing}>
          {isProcessing ? (
            <>
              <span className="spinner"></span>
              {t('paymentProcessing')}
            </>
          ) : (
            t('pay299')
          )}
        </button>
      </form>

      {/* Success/error message display */}
      {message && <p className="message">{message}</p>}

      {/* Subscription information disclaimer */}
      <div className="info-box">
        <p className="info">
          {t('disclaimerPart1')}
            <span className="semi-bold">{t('disclaimerSB1')}</span>
          {t('disclaimerPart2')}
            <span className="semi-bold">{t('disclaimerSB2')}</span>
          {t('disclaimerPart3')}
        </p>
      </div>
    </div>
  );
};

export default PaymentForm;