import React from "react";
import { useNavigate } from "react-router-dom";
import { removeAppliedCoupon } from "../../hooks/coupons/CouponCodes";
import { useCartContext } from "../../context/CartContext";
import { LanguageKey } from "../../../../dwtc-common-utility/src";

export function AppliedCouponCode({cart}){

    const {cartId} = useCartContext();
    const {refreshCart} = useCartContext();

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/coupon');
    }

    const handleRemoveCoupon = async () => {
        await removeAppliedCoupon(cartId);
        refreshCart();
    };

    return (
        <div>
            <div class="item_inner_box2">
                <div class="inner_box1">
                    <span class="icon_box">

                    </span>
                    <div class="txt_box">
                        {cart?.couponCode && (
                            <h5>
                                {cart.couponCode}
                            </h5>
                        )}
                        <span>
                            <button  onClick={handleClick}>
                                {LanguageKey.ViewAllCoupons}
                            </button>
                        </span>
                        {cart.couponCode && (
                            <div class="inner_box2">
                                <span class="btn_box">
                                    <button class="filled_btn filled_btn_sm" onClick={handleRemoveCoupon}>
                                        {LanguageKey.DeleteCoupon}
                                    </button>
                                </span>
                            </div>
                        )}
                    </div>

                </div>
            </div>            
        </div>
    )
}