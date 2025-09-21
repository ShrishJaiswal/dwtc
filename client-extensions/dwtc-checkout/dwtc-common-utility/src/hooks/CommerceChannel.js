import React from "react";
import { useState } from "react";

export default function useCommerceChannelFetch(){

    const [commerceChannelId, setCommerceChannelId] = useState('');

    React.useEffect(() => {
        try {
          if (Liferay?.CommerceContext?.commerceChannelId) {
            setCommerceChannelId(Liferay.CommerceContext.commerceChannelId);
          }
        } catch (err) {
          console.error("Exception while fetching commerce channel id :: " + err);
        }
      }, []);
    
    return {commerceChannelId};

}