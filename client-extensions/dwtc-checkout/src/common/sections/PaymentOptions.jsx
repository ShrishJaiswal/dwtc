import React from "react";
import { useSpecialInstructionContext } from "../../context/SpecialInstruction";
import CheckoutBtn from "../buttons/CheckoutBtn";
import LanguageKey from "../../utility/LanguageKey";

export function PaymentOptions(){

    return(
        <div>
            <section class="Payment_To_Proceed_Section">
                <div class="hospi_payment_to_proceed_wrapper">
                    <div class="container">
                        <div class="payment_proceed_wrapper">
                            <h5 class="title_txt">
                                Select Payment Options
                            </h5>
                            <form>
                                <div class="custom_radio">
                                    <div class="input_box border_top_box">
                                        <input type="radio" id="featured-1" name="featured" checked />
                                        <label for="featured-1"> Wallets </label>
                                    </div>
                                    <div class="input_box border_top_box">
                                        <input type="radio" id="featured-2" name="featured" />
                                        <label for="featured-2"> Credit / Debit / ATM Card </label>
                                    </div>
                                    <div class="input_box border_top_box">
                                        <input type="radio" id="featured-3" name="featured" />
                                        <label for="featured-3"> Google Pay </label>
                                    </div>
                                    <div class="input_box border_top_box">
                                        <input type="radio" id="featured-4" name="featured" />
                                        <label for="featured-4"> Apple Pay </label>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="btn_box">
                            <CheckoutBtn btnName={LanguageKey.CheckoutBtn}/>
                        </div>
                    </div>
                </div>
            </section>            
        </div>
    )
}