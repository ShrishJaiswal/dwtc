import React from "react";
import LanguageKey from "../../utility/LanguageKey";
import { removeCartItem } from "../../hooks/order-items/CartItem";
import { useCartContext } from "../../context/CartContext";

export default function RemoveCartItemBtn({cartItem}){

    const {refreshCart} = useCartContext();

    const handleItemRemove = () => {
        removeCartItem({cartItem}).then(()=>{
            refreshCart();
        })
    }

    return(
        <div>
            <button onClick={handleItemRemove}>{LanguageKey.DeleteCartItemBtn}</button>
        </div>
    )
}