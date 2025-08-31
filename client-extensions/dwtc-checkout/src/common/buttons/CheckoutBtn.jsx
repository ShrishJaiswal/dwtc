import React from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";

export default function CheckoutBtn({btnName}){

    const navigate = useNavigate();

    const {cartId} = useCartContext();

    const handleClick = () => {
        navigate("/summary");
    }
        
    return(
        <div>
            <button onClick={handleClick}>{btnName}</button>
        </div>
    )
}