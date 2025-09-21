import React from "react";
import { useNavigate } from "react-router-dom";
import { LanguageKey } from "../../../dwtc-common-utility/src";

export default function BackButton({toPath}){
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(toPath)
    }

    return(
        <button onClick={handleClick}>{LanguageKey.BACK_BUTTON}</button>
    )
}