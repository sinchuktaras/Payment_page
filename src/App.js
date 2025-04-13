import React from "react";
import PaymentForm from "./Components/CheckoutPage";
import { TranslationProvider } from './TranslationContext';

/**
 * MAin App.js wrapped in TranslationProvider
 */
function App() {
  return (
    <div className="App">
      <TranslationProvider>
      <PaymentForm />
      </TranslationProvider>
    </div>
  );
}

export default App;
