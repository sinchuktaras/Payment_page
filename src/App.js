import React from "react";
import PaymentForm from "./Components/CheckoutPage";
import { TranslationProvider } from './TranslationContext';

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
