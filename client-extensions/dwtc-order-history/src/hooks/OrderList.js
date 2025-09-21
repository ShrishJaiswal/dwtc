import React, { useEffect, useState } from "react";
import { Constants, getMicroServiceUserAgent, useCommerceAcccountFetch, useCommerceChannelFetch } from "../../../dwtc-common-utility/src";

export function useOrderListFetch(){

    const [orderList, setOrderList] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const {commerceChannelId} = useCommerceChannelFetch();
    const {account} = useCommerceAcccountFetch();
    const oAuth2Client = getMicroServiceUserAgent();

        useEffect(() => {
            if (!commerceChannelId || !account?.accountId) return;

            async function fetchData () {
                try{

                    const orderListReqCall = await oAuth2Client?.fetch(`/o/headless-commerce-delivery-order/v1.0/channels/${commerceChannelId}/accounts/${account.accountId}/placed-orders`);

                    if (!orderListReqCall){  
                        return;
                    }

                    const orderListRes = orderListReqCall;
                    setOrderList(orderListRes);
                }catch(err){
                    console.error("Exception while fetching data from Order List api "+err);
                    setError(Constants.ERROR_FETCHING_ORDER_LIST);
                } finally {
                    setLoading(false);
                }
            }
            fetchData();
        }, [commerceChannelId, account]);
    return {orderList, error, loading};

}