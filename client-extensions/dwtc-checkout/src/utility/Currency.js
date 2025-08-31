import React from "react";

export function fetchCurrency(){
    const [currency, setCurrency] = React.useState(null);

    React.useEffect(() => {
        try {
          if (Liferay?.CommerceContext?.currency) {
            setCurrency(Liferay.CommerceContext.currency);
          }
        } catch (err) {
          console.error("Exception while fetching commerce currency :: " + err);
        }
      }, []);
    return {currency};
}