import React from "react";
import { useTranslation } from "../TranslationContext";
import "./OrderSummary.css";

/**
 * OrderSummary Component
 * 
 * Displays the order information and pricing details in the checkout page.
 * Shows product information, description, and subscription pricing details.
 * 
 */
const OrderSummary = ({ productName, productDescription, price, duration }) => {
  // Translation hook 
  const { t } = useTranslation();
  
  return (
    <div className="order-summary">
      {/* Order Summary Header */}
      <h3>{t('orderInfo')}</h3>

      {/* Description Label */}
      <p className="order-description-label">
        {t('description')}
      </p>

      {/* Product Information Section */}
      <div className="product-info">
        <p className="product-name">{productName || t('productName')}</p>
        <p className="product-description">{productDescription || t('productSubtitle')}</p>
      </div>

      {/* Pricing Details Section */}
      <div className="price-summary">
        <p className="free-trial">
          {t('freeTrial')}
        </p>
        <p className="price-details">
          {t('price')}
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;