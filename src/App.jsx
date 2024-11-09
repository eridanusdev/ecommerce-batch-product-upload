import React from "react";
import "./App.css";
import { products } from "./assets/assets";
import submitAllProducts from "./utils/productService.js";

function App() {
  return (
    <div className="flex items-center justify-center">
      <button
        className="bg-blue-300 text-black px-4 py-2 rounded-lg"
        onClick={() => {
          submitAllProducts(products);
        }}
      >
        Add to DB
      </button>
    </div>
  );
}

export default App;
