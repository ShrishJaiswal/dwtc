import React from "react";
import { useNavigate } from "react-router-dom";
import { Constants } from "../../../../dwtc-common-utility/src";

export function ContinueBtn({selectedOption, btnName}){
    const navigate = useNavigate();

    const handleClick = () => {
      if (selectedOption === Constants.TAKEAWAY) {
        navigate("/takeaway");
      } else {
        navigate("/homedelivery");
      }
    };
  
    return (
      <button onClick={handleClick}>
        {btnName}
      </button>
    );
}