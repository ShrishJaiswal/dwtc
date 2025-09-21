import React, { useEffect, useState } from 'react';
import { ErrorConstants, getMicroServiceUserAgent, useCommerceAcccountFetch } from '../../../dwtc-common-utility/src';

export default function useHookForAccountAddressListFetch(){
    const {account} = useCommerceAcccountFetch();
    const [addressList, setAddressList] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const oAuth2Client = getMicroServiceUserAgent();
    useEffect(()=>{
        if (!account) return;
        async function fetchData() {
            try{
                console.log("in fetchData call");
                const reqCall = await oAuth2Client?.fetch(`/o/headless-admin-user/v1.0/accounts/${account.accountId}/postal-addresses`);
                if(!reqCall){
                    setError(ErrorConstants.EXCEPTION_ADDRESS_FETCH);
                    return;
                }
                const res = reqCall;
                console.log("respone is :: "+JSON.stringify(res));
                setAddressList(res);
            }catch(err){
                console.error(ErrorConstants.EXCEPTION_ADDRESS_FETCH, err);
                setError(ErrorConstants.EXCEPTION_ADDRESS_FETCH);
            }finally{
                setLoading(false);
            }
        }
        fetchData();
    }, [account]);

    return {addressList, error, loading, account};
}