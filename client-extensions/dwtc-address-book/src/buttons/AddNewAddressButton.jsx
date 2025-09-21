import React from "react";
import { useNavigate } from "react-router-dom";
import { LanguageKey } from "../../../dwtc-common-utility/src";
export function AddNewAddressButton({accountId, addressId=0}){
    const navigate = useNavigate();
    const handleAddNewAddressBtnClick = () =>{
        navigate(`/address/${accountId}/${addressId}`);
    }

    return(
        <button className="filled_btn filled_btn_lg" onClick={handleAddNewAddressBtnClick}>{LanguageKey.AddNewAddressButton}</button>
    )
}