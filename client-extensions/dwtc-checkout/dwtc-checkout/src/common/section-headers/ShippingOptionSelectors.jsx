import React, { useState } from "react";
import { useCartContext } from "../../context/CartContext";
import { Constants, LanguageKey } from "../../../../dwtc-common-utility/src";

export default function ShippingOptionSelectors({onSelectionChange}){

    const {selectedOption, setSelectedOption} = useCartContext();

    const handleSelect = (option) => {
      setSelectedOption(option);
      onSelectionChange(option);
    };
  
    return (
      <div className="">
        <button
          onClick={() => handleSelect(Constants.TAKEAWAY)}
          className={`${
            selectedOption === Constants.TAKEAWAY
              ? "takeaway"
              : ""
          }`}
        >
          {Liferay.Language.get(LanguageKey.TakeAway)}
        </button>
  
        <button
          onClick={() => handleSelect(Constants.HOMEDELIVERY)}
          className={`${
            selectedOption === Constants.HOMEDELIVERY
              ? "homedelivery"
              : ""
          }`}
        >
          {Liferay.Language.get(LanguageKey.HomeDelivery)}
        </button>
      </div>
    );
}