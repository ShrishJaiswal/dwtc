import React, { useEffect, useState } from "react";
import { ErrorConstants } from "../../../../dwtc-common-utility/src";
import { getMicroServiceUserAgent } from "../../../../dwtc-common-utility/src/hooks/HeadlessUserAgentService";

export function useCouponCodesCall(){
    const [couponObj, setCouponObj] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const oAuth2Client = getMicroServiceUserAgent();

    useEffect(()=>{
        async function fetchData() {
            try{
                const couponCodesReqCall = await oAuth2Client?.fetch(`/o/headless-commerce-admin-pricing/v1.0/discounts`);

                if (!couponCodesReqCall){
                    setError(ErrorConstants.COUPON_CODES_ALL_ERR);
                }

                const couponCodesResCall = couponCodesReqCall;
                setCouponObj(couponCodesResCall);

            } catch (error){
                setError(ErrorConstants.COUPON_CODES_ALL_ERR);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return {couponObj, error, loading}
}

export async function searchCouponCode(couponCode) {

    const oAuth2Client = getMicroServiceUserAgent();

    try {
        const res = await oAuth2Client?.fetch(
            `/o/headless-commerce-admin-pricing/v1.0/discounts/by-externalReferenceCode/${couponCode}`
        );

        if (!res) return null;
        return res;
    } catch (err) {
        console.error("Error searching coupon", err);
        return null;
    }
}

export async function applyCouponCode(cartId, couponCode) {
    const oAuth2Client = getMicroServiceUserAgent();

    const body = { "code": couponCode };

    try {
        const res = await oAuth2Client?.fetch(
            `/o/headless-commerce-delivery-cart/v1.0/carts/${cartId}/coupon-code`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            }
        );
        console.log("res is " + JSON.stringify(res));
        return res;
    } catch (err) {
        console.error("Error While Applying CouponCode " + err);
        throw err;
    }
}

export async function removeAppliedCoupon(cartId) {
    const oAuth2Client = getMicroServiceUserAgent();

    const body = { "code": "" };

    try {
        const res = await oAuth2Client?.fetch(
            `/o/headless-commerce-delivery-cart/v1.0/carts/${cartId}/coupon-code`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            }
        );
        return res;
    } catch (err) {
        console.error("Error While Applying CouponCode " + err);
        throw err;
    }
}

export async function findAccountDiscount(cart){
    const oAuth2Client = getMicroServiceUserAgent();
    try{
        const res = await oAuth2Client?.fetch(`/o/headless-commerce-admin-account/v1.0/accounts/${cart.accountId}/account-channel-discounts`);
        
        if (res?.items?.[0] && res.items.length > 0){
            const couponCodeObj = await searchCouponCode(res.items?.[0].classExternalReferenceCode);
            if (couponCodeObj && couponCodeObj?.couponCode){
                return await applyCouponCode(cart.id, couponCodeObj?.couponCode);
            }
        }
    } catch (err){
        console.error("Error while fetching default discouint attached to account");
        throw err;
    }
}