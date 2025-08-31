import React, { useState } from "react";
import { useCartContext } from "../../context/CartContext";
import LanguageKey from "../../utility/LanguageKey";
import { applyCouponCode, searchCouponCode, searchCouponCodeAndDirectlyApply, useCouponCodesCall } from "../../hooks/coupons/CouponCodes";
import { Loading } from "../errors/Loading";
import { useNavigate } from "react-router-dom";

export function CouponCodes(){
    const {cartId} = useCartContext();

    const {couponObj, error, loading} = useCouponCodesCall();
    const [searchedCode, setSearchedCode] = useState(null);
    const [msg, setMsg] = useState(null);


    const navigate = useNavigate();

    const handleApplyCoupon = async (couponCode) => {
        await applyCouponCode(cartId, couponCode);
        navigate("/");
    };

    const handleSearchApply = async () => {
        if (!searchedCode) {
            setMsg("Please enter a coupon code");
            return;
        }

        const foundCoupon = await searchCouponCode(searchedCode);
        console.log(foundCoupon);
        if (foundCoupon) {
            await applyCouponCode(cartId, foundCoupon.couponCode);
            setMsg(LanguageKey.CouponApplied);
            navigate("/");
        } else {
            setMsg("Coupon code does not exist");
            setSearchedCode("");
        }
    };

    if (error){
        <></>
    }

    if (loading)
    {
        <Loading />
    }

    return(
        <div>
            <section class="Apply_Coupons_Section">
            <div class="hospi_appply_coupons_wrapper">
                <div class="container">
                    <div class="appply_coupons_wrapper">
                        <div class="input-box">
                            <input type="text" placeholder="Have a Coupon Code ? Type Here" value={searchedCode} onChange={(e)=>setSearchedCode(e.target.value)}/>
                        </div>
                        <div class="btn_box">
                            <button class="filled_btn" onClick={handleSearchApply}>
                                {LanguageKey.ApplyCouponBtn}
                            </button>
                        </div>
                    </div>
                    {msg && (
                        <p style={{ marginTop: "10px", color: "red" }}>
                            {msg}
                        </p>
                    )}
                </div>
            </div>
        </section>

        {couponObj?.items?.length > 0 && (
            <section class="Coupons_Option_Section">
                <div class="hospi_coupons_option_wrapper">
                    <div class="container">
                        <div class="coupons_option_wrapper">
                            {couponObj.items.map((coupon, index) => (
                                <div class="coupons_option_box">
                                    <div class="coupon-card" data-code="radio1">
                                        <div class="coupon-left">
                                            <div class="coupon-inner_box">
                                                <div class="coupon-icon">
                                                    <img src="images/svg/discount.svg" alt="" />
                                                </div>
                                                <div class="coupon-txt-box">
                                                    <p class="coupon-title">{coupon.couponCode}</p>
                                                    <p class="coupon-desc">{coupon.customFields?.couponDesc}</p>
                                                    <div class="coupon-code">
                                                        <button class="filled_btn" onClick={() => handleApplyCoupon(coupon.couponCode)}> {LanguageKey.ApplyCouponBtn} </button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div class="radio-circle"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section> 
        )}
    </div>    
    )
}