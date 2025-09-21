import React from "react";
import { LanguageKey } from "../../../../dwtc-common-utility/src";

export default function NoCartItem(){
    return(
        <div>
            <h2>
                {LanguageKey.NoCartItemExist}
            </h2>
        </div>
    )
}