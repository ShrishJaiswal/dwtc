import React, { useEffect, useState } from "react";
import fetchCommerceAccount from "../account/CommerceAccount";
import { useChannelFetch } from "../channel/Channel";
import { Loading } from "../../common/errors/Loading";
import NoChannel from "../../common/errors/NoChannel";
import { getMicroServiceUserAgent } from "../../services/UserAgentService";
import useCommerceAcccountFetch from "../account/CommerceAccount";
import ErrorConstants from "../../utility/ErrorConstants";
import { findCommerceOrderCookie } from "../../utility/Cookies";

export function fetchOrderByCookie(){

    const [cart, setCart] = useState(null);

        const orderUUID = findCommerceOrderCookie();
        console.log("ORDER UUID is "+orderUUID);
        
        useEffect(()=> {
        
            async function fetchData(){
                try{

                    const orderObjReqCall = await baseFetch(`/o/headless-commerce-admin-order/v1.0/orders/by-externalReferenceCode/${orderUUID}`);
                    const orderObjResCall = await orderObjReqCall.json();

                    if (orderObjResCall === null){
                        throw new Error("Exception while fetching order data");
                    }

                    const cartReqCall = await baseFetch(`/o/headless-commerce-delivery-cart/v1.0/carts/${orderObjResCall.id}`);
                    const cartResCall = await cartReqCall.json();

                    setCart(cartResCall);

                    console.log("Cart Response is "+cart);
                }catch(err){
                    throw new Error("Exception while fetching the data");
                }
            }

            fetchData();
        
        }, []);

    return {cart};
}


export function patchCommerceOrder(billingAddressId, shippingAddressId){

    console.log("Inside patchCommerceOrder");

    const orderUUID = findCommerceOrderCookie();

    console.log("commerce order uuid is "+orderUUID);

    const jsonData = {
        "billingAddressId" : billingAddressId,
        "shippingAddressId" : shippingAddressId
    };

        async function patchData(){
            await baseFetch(`/o/headless-commerce-admin-order/v1.0/orders/by-externalReferenceCode/${orderUUID}`
            ).then((orderObjData)=>{
                console.log("orderObjData is "+JSON.stringify(orderObjData));
                if (!orderObjData.ok){
                    throw new Error("Exception while fetching commerce order object");
                }
                return orderObjData.json();
            }).then(async (data) =>{
                await baseFetch(`/o/headless-commerce-delivery-cart/v1.0/carts/${data.id}`, {
                    method : 'PATCH',
                    body : JSON.stringify(jsonData)
                }).then((res) => {
                    console.log("res is "+JSON.stringify(res))
                    if (!res.ok){
                        throw new Error("Exception while updating commerce order");
                    }
                    return res.json();
                }).then(async (data) => {
                    console.log("updated commerce address");
    
                    await baseFetch(`/o/headless-commerce-delivery-cart/v1.0/carts/${data.id}/checkout`, {
                        method : 'POST'
                    }).then(res => {
                        if (!res.ok){
                            throw new Error("Exception while calling checkout api");
                        }
                        return res.json();
                    }).then((data) => {
                        console.log(data);
    
                    });
    
                })
            })
        }


    patchData();
    
    eraseCookie(Constants.COMMERCE_ORDER_COOKIE);
}

export function fetchOrderByLatestOpenCart(){
    console.log("Inside fetchOrderByLatestOpenCart");

    const {account} = useCommerceAcccountFetch();
    const orderUUID = findCommerceOrderCookie();
    const oAuth2Client = getMicroServiceUserAgent();
    const {channel, error: channelError, loading: channelLoading} = useChannelFetch();

    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [cart, setCart] = React.useState(null);

    React.useEffect(() => {
        async function fetchData() {
            try{
                
                if (orderUUID == null || orderUUID == undefined || orderUUID == ""){
                    
                    if (channelLoading){
                        return;
                    }

                    if (channelError){
                        return;
                    }

                    const allOpenCartsReq = await oAuth2Client?.fetch(`/o/headless-commerce-delivery-cart/v1.0/channels/${account?.accountId}/account/${channel?.id}/carts`) 
                    if (!allOpenCartsReq.ok){
                        setError(ErrorConstants.OPEN_ORDER_ERR);
                    }

                    const allOpenCartsRes = await allOpenCartsReq.json();

                    const openCart = allOpenCartsRes.items.find( (cart) => cart.orderStatusInfo.code === 2);

                    if (openCart){
                        setCart(openCart);
                    }
                }
            }catch(err){
                console.error("Exception while fetching the latest open cart :: "+err);
                setError(ErrorConstants.OPEN_ORDER_ERR);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [account, orderUUID]);

    return {cart, error, loading};

}

export function useCommerceOrderFetch(refreshFlag){
    const {account} = useCommerceAcccountFetch();
    const orderUUID = findCommerceOrderCookie();
    const oAuth2Client = getMicroServiceUserAgent();
    const {channel, error: channelError, loading: channelLoading} = useChannelFetch();

    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [cart, setCart] = React.useState(null);

    React.useEffect(() =>{
        if (!channel || !account) return;
        async function openCartByCookie(){
            try{
                    const orderObjReqCall = await oAuth2Client?.fetch(`/o/headless-commerce-admin-order/v1.0/orders/by-externalReferenceCode/${orderUUID}`);

                    if (orderObjReqCall === null || !orderObjReqCall){
                        setError(ErrorConstants.OPEN_ORDER_ERR);
                        return;
                    }

                    const cartResCall = orderObjReqCall;
                    setCart(cartResCall);
                    setError(null);

            }catch (err){
                setError(ErrorConstants.OPEN_ORDER_ERR);
            } finally {
                setLoading(false);
            }
        }

        async function latestOpenCart() {
            try{
                    const allOpenCartsReq = await oAuth2Client?.fetch(`/o/headless-commerce-delivery-cart/v1.0/channels/${channel?.id}/account/${account?.accountId}/carts`) 
                    
                    if (!allOpenCartsReq){
                        setError(ErrorConstants.OPEN_ORDER_ERR);
                        return;
                    }

                    const allOpenCartsRes = allOpenCartsReq;
                    const openCart = allOpenCartsRes.items.find( (cart) => cart.orderStatusInfo.code === 2);
                    if (openCart){
                        setCart(openCart);
                        setError(null);
                    }         

            }catch (err){
                setError(ErrorConstants.OPEN_ORDER_ERR);
            } finally {
                setLoading(false);
            }
        }

        if (orderUUID){
            openCartByCookie();
        } else {
            latestOpenCart();
        }

    }, [orderUUID, account, channel, channelLoading, channelError, refreshFlag]);

    return {cart, error, loading};
}

export function useCartFetchById(cartId, refreshFlag){
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const oAuth2Client = getMicroServiceUserAgent();

    useEffect(()=>{
        if (!cartId){return;}
        async function fetchData() {
            try{
                const orderReqCall = await oAuth2Client?.fetch(`/o/headless-commerce-delivery-cart/v1.0/carts/${cartId}`);
                if (!orderReqCall){
                    setError(ErrorConstants.CART_BY_ID_ERR);
                    return;
                }

                const orderResCall = orderReqCall;
                setCart(orderResCall);
                setError(null);
            }catch(err){
                setError(ErrorConstants.CART_BY_ID_ERR);
            } finally{
                setLoading(false);
            }
        }
        fetchData();
    }, [cartId, refreshFlag]);

    return {cart, error, loading};
}