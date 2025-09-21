import React, { useEffect, useState } from "react";
import { useCartFetchById } from "../order/Order";
import { useCartContext } from "../../context/CartContext";
import { ErrorConstants } from "../../../../dwtc-common-utility/src";
import { getMicroServiceUserAgent } from "../../../../dwtc-common-utility/src/hooks/HeadlessUserAgentService";

export function useCartItemFetch(){

    const [cartItems, setCartItems] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const {cartId, refreshFlag} = useCartContext();
    console.log("cartItemFetch by cartId is :: "+cartId);
    const {cart, error:cartError, loading:cartLoading} = useCartFetchById(cartId, refreshFlag);
    const oAuth2Client = getMicroServiceUserAgent();
        
        useEffect(() => {
            async function fetchData () {
                try{

                    if (cartLoading){return;}

                    if (cartError){setError(ErrorConstants.CART_ERR); return;}

                    const cartItemReqCall = await oAuth2Client?.fetch(`/o/headless-commerce-delivery-cart/v1.0/carts/${cart.id}/items`);

                    if (!cartItemReqCall){  
                        setError(ErrorConstants.CART_ERR);
                        return;
                    }

                    const cartItemResCall = cartItemReqCall;

                    setCartItems(cartItemResCall);
                }catch(err){
                    console.error("Exception while fetching data from Cart Item api "+err);
                    setError(ErrorConstants.CART_ERR);
                } finally {
                    setLoading(true);
                }
            }
            fetchData();
        }, [cart, cartError, cartLoading]);
    return {cartItems, error, loading};

}

export function updateCartItemObj({cartItem}){
    const oAuth2Client = getMicroServiceUserAgent();

    async function updateCartItem(){
        await oAuth2Client?.fetch(`/o/headless-commerce-delivery-cart/v1.0/cart-items/${cartItem.id}`,{
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cartItem)
        }).then((res) => {
            console.log("res is "+JSON.stringify(res))
            return res;
        })
    }

    return updateCartItem();
}

export function removeCartItem({cartItem}){
    const oAuth2Client = getMicroServiceUserAgent();
    async function remove(){
        await oAuth2Client?.fetch(`/o/headless-commerce-delivery-cart/v1.0/cart-items/${cartItem.id}`,{
            method: 'DELETE',
        }).then((res) => {
            console.log("res is "+JSON.stringify(res))
            return res;
        })
    }

    return remove();
}