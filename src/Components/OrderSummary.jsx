// OrderSummary.jsx
import React from "react";
import "./OrderSummary.css";

const OrderSummary = ({ productName, productDescription, price, duration }) => {
  return (
    <div className="order-summary">
      <h3>Order info <span className="char-limit">≤ 100 char.</span></h3>
      
      <div className="description-section">
        <p className="description-label">Description <span className="char-limit">≤ 400 char.</span></p>
        
        <div className="product-info">
          <p className="product-name">{productName || "(Add the item name)"}</p>
          <p className="product-description">{productDescription || "(Add item desc)"}</p>
        </div>
        
        <div className="price-summary">
          <p className="free-trial">5 days free</p>
          <p className="price-details">then {price || "(Add item price)"} per {duration || "(Add the duration))"}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;