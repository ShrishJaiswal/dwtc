import React, { useState } from "react";
import { useCartItemFetch } from "../../hooks/order-items/CartItem";
import QtySelectorBtn from "../buttons/QtySelectorBtn";
import { AdaptiveMediaImgParser } from "../images/AdaptiveMediaImgParser";
import { useSpecialInstructionContext } from "../../context/SpecialInstruction";
import { AppliedCouponCode } from "./AppliedCouponCode";
import RemoveCartItemBtn from "../buttons/RemoveCartItemBtn";
import { LanguageKey } from "../../../../dwtc-common-utility/src";

export function ItemSummary({cartItems}){
    
    const [selectedItemOptions, setSelectedItemOptions] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleViewClick = (item) => {
        let parsedOptions = [];
        try {
            parsedOptions = JSON.parse(item.options);
        } catch (e) {
            console.error("Failed to parse item options", e);
        }

        if (!Array.isArray(parsedOptions)) {
            parsedOptions = [parsedOptions];
        }

        setSelectedItemOptions(parsedOptions);
        setShowModal(true);
    }

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
                            cartItems.items.map((item, idx) => {
                                const hasOptions = item.options && item.options !== "[]";
                                return (
                                    <div class="item_inner_box1" key={idx}>
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
                                        {hasOptions && (
                                            <div id="item-options-id" onClick={() => handleViewClick(item)}>
                                                View
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                            ):(<p></p>)}
                        </div>
                        <div class="red_alert_box red_alert_box_responsive1">
                        </div>
                    </div>
                </div>
            </div>

            {/* Item Options Modal */}
            {showModal && (
                <div className="modal show" style={{ display: "block" }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button
                                    type="button"
                                    className="close"
                                    onClick={() => setShowModal(false)}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {selectedItemOptions.length > 0 ? (
                                    selectedItemOptions.map((opt, i) => (
                                        <div key={i} className="mb-2">
                                            <strong>{opt.skuOptionName}</strong>
                                            <div>{Array.isArray(opt.skuOptionValueNames) ? opt.skuOptionValueNames.join(", ") : opt.value}</div>
                                        </div>
                                    ))
                                ) : (
                                    <p>{LanguageKey.NoOptionsExist}</p>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )

}