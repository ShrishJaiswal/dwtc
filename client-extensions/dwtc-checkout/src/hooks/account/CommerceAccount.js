import React from "react";

export default function useCommerceAcccountFetch(){

    const [account, setAccount] = React.useState('');

    React.useEffect(() => {
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

