import React from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentBtn({btnName}){

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/payment");
    }

    return(
        <div>
            <button onClick={handleClick}>{btnName}</button>
        </div>
    )
}