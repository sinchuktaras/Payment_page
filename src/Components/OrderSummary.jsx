import React from "react";
import { useTranslation } from "../TranslationContext";
import "./OrderSummary.css";

const OrderSummary = ({ productName, productDescription, price, duration }) => {
  // Add the translation hook directly in the component
  const { t } = useTranslation();
  
  return (
    <div className="order-summary">
      <h3>{t('orderInfo')}</h3>

      <p className="order-description-label">
        {t('description')}
      </p>

      <div className="product-info">
        <p className="product-name">{productName || t('productName')}</p>
        <p className="product-description">{productDescription || t('productSubtitle')}</p>
      </div>

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
