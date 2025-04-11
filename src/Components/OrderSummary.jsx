import React from "react";
import "./OrderSummary.css";

const OrderSummary = ({ productName, productDescription, price, duration }) => {
  return (
    <div className="order-summary">
      <h3>Order Summary</h3>

      <p className="order-description-label">
        Order Description <span className="char-limit">≤ 400 char.</span>
      </p>

      <div className="product-info">
        <p className="product-name">{productName || "Item name goes here"}</p>
        <p className="product-description">{productDescription || "Item description goes here..."}</p>
      </div>

      <div className="price-summary">
        <p className="free-trial">5 days free</p>
        <p className="price-details">
          Then <span className="price-amount">{price || "$X.XX"}</span> per {duration || "month"}
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
