import React from "react";
import LanguageKey from "../../utility/LanguageKey";

export default function NoCartItem(){
    return(
        <div>
            <h2>
                {LanguageKey.NoCartItemExist}
            </h2>
        </div>
    )
}