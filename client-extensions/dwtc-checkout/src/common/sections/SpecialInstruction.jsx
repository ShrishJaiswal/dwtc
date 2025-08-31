import React from "react";
import LanguageKey from "../../utility/LanguageKey";
import { useSpecialInstructionContext } from "../../context/SpecialInstruction";

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