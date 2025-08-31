import React from "react";
import { useCartItemFetch } from "../../hooks/order-items/CartItem";
import LanguageKey from "../../utility/LanguageKey";
import QtySelectorBtn from "../buttons/QtySelectorBtn";
import { AdaptiveMediaImgParser } from "../images/AdaptiveMediaImgParser";
import { useSpecialInstructionContext } from "../../context/SpecialInstruction";
import { AppliedCouponCode } from "./AppliedCouponCode";
import RemoveCartItemBtn from "../buttons/RemoveCartItemBtn";

export function ItemSummary({cartItems}){
    return(
        <div>
            <div class="tab tab-active" data-id="tab1">
                <div class="tab_inner_wrapper">
                    <div class="tab_box tab_box2">
                        <div class="item_summary_box">
                            <h3>
                                {LanguageKey.ItemSummary}
                            </h3>
                            {cartItems?.items?.length > 0 ? (
                            cartItems.items.map((item, idx) => (
                                <div class="item_inner_box1">
                                    <div class="inner_box1">
                                        <div class="txt_box">
                                            <h5>
                                                {item?.name}
                                            </h5>
                                            <h6>
                                                {item.priceFormatted}
                                            </h6>
                                        </div>
                                        <QtySelectorBtn cartItem = {item} />
                                    </div>
                                    <div class="inner_box2">
                                        <div class="img_box">
                                            <AdaptiveMediaImgParser adaptiveMediaImageHTMLTag={item.adaptiveMediaImageHTMLTag} />
                                        </div>
                                    </div>
                                    <div>
                                        <RemoveCartItemBtn cartItem={item}/>
                                    </div>
                                </div>
                            ))
                            ):(<p></p>)}
                        </div>
                        <div class="red_alert_box red_alert_box_responsive1">
                            <p>
                                The items added to cart can be ordered for delivery on Fri Jun 20 2025 : 10:16
                                onwards
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}