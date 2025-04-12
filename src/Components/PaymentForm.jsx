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
        <svg className="apple-logo" viewBox="0 0 170 170" width="17" height="17">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.197-2.12-9.973-3.17-14.34-3.17-4.58 0-9.492 1.05-14.746 3.17-5.262 2.13-9.501 3.24-12.742 3.35-4.929.21-9.842-1.96-14.746-6.52-3.13-2.73-7.045-7.41-11.735-14.04-5.032-7.08-9.169-15.29-12.41-24.65-3.471-10.11-5.211-19.9-5.211-29.378 0-10.857 2.346-20.221 7.045-28.068 3.693-6.303 8.606-11.275 14.755-14.925s12.793-5.51 19.948-5.629c3.915 0 9.049 1.211 15.429 3.591 6.362 2.388 10.447 3.599 12.238 3.599 1.339 0 5.877-1.416 13.57-4.239 7.275-2.618 13.415-3.702 18.445-3.275 13.63 1.1 23.87 6.473 30.68 16.153-12.19 7.386-18.22 17.731-18.1 31.002.11 10.337 3.86 18.939 11.23 25.769 3.34 3.17 7.07 5.62 11.22 7.36-.9 2.61-1.85 5.11-2.86 7.51zM119.11 7.24c0 8.102-2.96 15.667-8.86 22.669-7.12 8.324-15.732 13.134-25.071 12.375a25.222 25.222 0 0 1-.188-3.07c0-7.778 3.386-16.102 9.399-22.908 3.002-3.446 6.82-6.311 11.45-8.597 4.62-2.252 8.99-3.497 13.1-3.71.12 1.083.17 2.166.17 3.24z" 
            fill="white"/>
        </svg>
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
          {isProcessing ? "Processing..." : "Pay 299.99 UAH"}
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