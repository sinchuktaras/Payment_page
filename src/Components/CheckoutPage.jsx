// CheckoutPage.jsx
import React from "react";
import PaymentForm from "./PaymentForm";
import OrderSummary from "./OrderSummary";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="payment-section">
          <PaymentForm />
        </div>
        <div className="summary-section">
          <OrderSummary 
            productName="Lamel Professional Smart Skin Compact Powder"
            productDescription="Пудра для лиця"
            price="299.99 UAH"
            duration="14 days"
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;