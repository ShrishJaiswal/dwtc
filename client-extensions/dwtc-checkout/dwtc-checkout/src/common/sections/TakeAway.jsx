import React from "react";
import { useSpecialInstructionContext } from "../../context/SpecialInstruction";
import PaymentBtn from "../buttons/PaymentBtn";
import { LanguageKey } from "../../../../dwtc-common-utility/src";

export function TakeAway(){

    const {takeAwayTime, setTakeAwayTime} = useSpecialInstructionContext();
    const {takeAwayDate, setTakeAwayDate} = useSpecialInstructionContext();
    const {takeAwayOrderNote, setTakeAwayOrderNote} = useSpecialInstructionContext();

    return(
        <div class="tab tab-active" data-id="tab1">
            <div class="form_Main_box">
                <div class="form_tab_box">
                    <form class="hospi_form_box">
                        <div class="form_inner_box">
                            <div class="full_form_box">
                                <input type="date" name="" id="" class="input_box"
                                    placeholder="Take Away Date*" value={takeAwayDate} onChange={(e) => setTakeAwayDate(e.target.value)}/>
                            </div>
                        </div>
                        <div class="form_inner_box">
                            <div class="full_form_box">
                                <input type="time" name="" id="" class="input_box"
                                    placeholder="Take Away Time *" value={takeAwayTime} onChange={(e) => setTakeAwayTime(e.target.value)}/>
                            </div>
                        </div>
                        <div class="form_inner_box">
                            <div class="full_form_box">
                                <textarea name="" id="" placeholder="Order Notes" value={takeAwayOrderNote} onChange={(e)=>setTakeAwayOrderNote(e.target.value)}></textarea>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="form_tab_box">
                    <div class="map_box">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d2965.0824050173574!2d-93.63905729999999!3d41.998507000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sWebFilings%2C+University+Boulevard%2C+Ames%2C+IA!5e0!3m2!1sen!2sus!4v1390839289319"
                            frameborder="0"></iframe>
                    </div>
                </div>
            </div>
            <div class="proceed_btn_box">
                <PaymentBtn btnName={LanguageKey.PaymentBtn}/>
            </div>
        </div>        
    )
}