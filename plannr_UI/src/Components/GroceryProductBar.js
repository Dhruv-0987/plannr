import React from "react";

function GroceryProductBar({ product }) {
  return (
    <div className="m-2 w-[450px]">
      <div className="border border-black rounded-md shadow-sm p-4 grid grid-cols-2">
        <div>
          <p className="text-lg font-playfair">{product.productName}</p>
          <p className="text-md font-playfair italic">({product.category})</p>
        </div>
        <div className="space-x-2">
            <span>Price:</span><span>{product.pricePerUnit}$</span><span>for {product.size} {product.priceUnit}</span>
        </div>
      </div>
    </div>
  );
}

export default GroceryProductBar;
