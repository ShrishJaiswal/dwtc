import React, { useState } from "react";
import { updateCartItemObj } from "../../hooks/order-items/CartItem";
import { useCartContext } from "../../context/CartContext";

export default function QtySelectorBtn({cartItem}){

    const [quantity, setQuantity] = useState(cartItem.quantity);
    const { refreshCart } = useCartContext();

    const handleQuantityChange = (change) => {
      const min = cartItem.settings?.minQuantity;
      const max = cartItem.settings?.maxQuantity;
  
      let newQty = quantity + change;
  
      if (newQty < min) newQty = min;
      if (newQty > max) newQty = min;
  
      if (newQty !== quantity) {
        setQuantity(newQty);
  
        const updatedCartItem = { ...cartItem, quantity: newQty };
  
        updateCartItemObj({ cartItem: updatedCartItem }).then(() =>{
            refreshCart();
        });
      }
    };

    return (
        <div className="quantity-box">
          <button className="increase" onClick={() => handleQuantityChange(1)}>
            <img src="images/svg/pluse.svg" alt="increase" />
          </button>
    
          <span className="number">{quantity}</span>
    
          <button className="decrease" onClick={() => handleQuantityChange(-1)}>
            <img src="images/svg/minus.svg" alt="decrease" />
          </button>
        </div>
      );
}