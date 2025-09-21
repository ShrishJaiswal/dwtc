import React from "react";
import { useSpecialInstructionContext } from "../../context/SpecialInstruction";
import { LanguageKey } from "../../../../dwtc-common-utility/src";

export default function SpecialInstruction(){

    const {specialInstruction, setSpecialInstruction} = useSpecialInstructionContext();

    return(
        <div>
            <div class="item_inner_box3">
                <h5>
                    {LanguageKey.SpecialInstruction}
                </h5>
                <textarea name="text"
                    placeholder="e.g. Please leave food at the gate/door"
                    value={specialInstruction}
                    onChange={(e) => setSpecialInstruction(e.target.value)}
                ></textarea>
            </div>           
        </div>
    )
}