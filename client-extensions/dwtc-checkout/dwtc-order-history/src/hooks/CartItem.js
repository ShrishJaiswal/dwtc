import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ErrorConstants, getMicroServiceUserAgent } from "../../../dwtc-common-utility/src";

export function useCartItemFetch({cartId}){

    const [cartItems, setCartItems] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const oAuth2Client = getMicroServiceUserAgent();
        
        useEffect(() => {
            if (!cartId) return;
            async function fetchData () {
                try{

                    const cartItemReqCall = await oAuth2Client?.fetch(`/o/headless-commerce-delivery-order/v1.0/placed-orders/${cartId}/placed-order-items`);

                    if (!cartItemReqCall){  
                        setError(ErrorConstants.EXCEPTION_CART_ITEM_FETCH);
                        return;
                    }

                    const cartItemResCall = cartItemReqCall;
                    setCartItems(cartItemResCall);
                }catch(err){
                    console.error("Exception while fetching data from Cart Item api "+err);
                    setError(ErrorConstants.EXCEPTION_CART_ITEM_FETCH);
                } finally {
                    setLoading(false);
                }
            }
            fetchData();
        }, [cartId]);
    return {cartItems, error, loading};

}