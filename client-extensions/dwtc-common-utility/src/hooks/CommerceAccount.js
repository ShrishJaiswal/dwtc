import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function useCommerceAcccountFetch(){

    const [account, setAccount] = useState('');

    useEffect(() => {
        try {
          if (Liferay?.CommerceContext?.account) {
            setAccount(Liferay.CommerceContext.account);
          }
        } catch (err) {
          console.error("Exception while fetching commerce account :: " + err);
        }
      }, []);
    
    return {account};

}