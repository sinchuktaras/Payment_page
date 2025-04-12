import React, { useState } from "react";
import "./PaymentForm.css";

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({
    cardNumber: "",
    expiry: "",
    cvc: ""
  });

  // Card number validation
  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    
    if (value.length <= 16) {
      setCardNumber(value.replace(/(.{4})/g, '$1 ').trim()); // Format with spaces every 4 digits
      
      if (errors.cardNumber && value.length === 16) {
        setErrors({ ...errors, cardNumber: "" });
      }
    }
  };

  // Expiry validation
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

  // CVC validation
  const handleCvcChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    
    if (value.length <= 3) {
      setCvc(value);
      
      if (errors.cvc && value.length === 3) {
        setErrors({ ...errors, cvc: "" });
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    
    // Validate card number
    if (!cardNumber || cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = "Please enter a valid 16-digit card number";
      isValid = false;
    }
    
    // Validate expiry
    if (!expiry || expiry.length !== 5) {
      newErrors.expiry = "Please enter a valid expiry date (MM/YY)";
      isValid = false;
    } else {
      const [month, year] = expiry.split('/');
      if (parseInt(month) < 1 || parseInt(month) > 12) {
        newErrors.expiry = "Month must be between 01-12";
        isValid = false;
      }
    }
    
    // Validate CVC
    if (!cvc || cvc.length !== 3) {
      newErrors.cvc = "CVC must be 3 digits";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);
    setMessage("");

    // Payment processing simulation
    setTimeout(() => {
      setIsProcessing(false);
      setMessage("✅ Payment successful! Thank you.");
      // Clear fields
      setCardNumber("");
      setExpiry("");
      setCvc("");
    }, 2000);
  };

  return (
    <div className="payment-container">
      <div className="checkout-header">
        <svg className="back-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h2>Checkout</h2>
      </div>
      
      <div className="pricing-info">
        <h3>5 days free</h3>
        <p>then 299.99 UAH per 14 days</p>
      </div>

      <button className="apple-pay">
        <i className="fab fa-apple"></i>
        <span>Pay</span>
      </button>

      <div className="divider">
        <span>or pay with card</span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Card Number</label>
          <input
            type="text"
            placeholder="1234 1234 1234 1234"
            value={cardNumber}
            onChange={handleCardNumberChange}
            className={errors.cardNumber ? "error" : ""}
          />
          {errors.cardNumber && <div className="error-message">{errors.cardNumber}</div>}
        </div>
        
        <div className="inline-fields">
          <div className="form-group">
            <label>Expiration Date</label>
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
            <label>CVC</label>
            <div className="cvc-container">
              <input
                type="text"
                placeholder="•••"
                value={cvc}
                onChange={handleCvcChange}
                className={errors.cvc ? "error" : ""}
              />
              <button type="button" className="info-button">
                <span className="info-icon">ⓘ</span>
              </button>
            </div>
            {errors.cvc && <div className="error-message">{errors.cvc}</div>}
          </div>
        </div>
        
        <button className="pay-btn" type="submit" disabled={isProcessing}>
          {isProcessing ? (
            <>
              <span className="spinner"></span>
              Processing payment
            </>
          ) : (
            "Pay 299.99 UAH"
          )}
        </button>
      </form>

      {message && <p className="message">{message}</p>}

      <div className="info-box">
        <p className="info">
          You'll have your <span className="semi-bold">Plan Pro during 1 year</span>. After this period of time, 
          your plan will be <span className="semi-bold">automatically renewed</span> with its original price 
          without any discounts applied.
        </p>
      </div>
    </div>
  );
};

export default PaymentForm;