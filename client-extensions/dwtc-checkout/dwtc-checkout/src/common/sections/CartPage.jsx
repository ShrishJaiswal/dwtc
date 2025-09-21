import React, { useEffect, useRef, useState } from "react";
import ShippingOptionSelectors from "../section-headers/ShippingOptionSelectors";
import { useCommerceOrderFetch } from "../../hooks/order/Order";
import { PaymentSummary } from "./PaymentSummary";
import { Loading } from "../errors/Loading";
import { useCartContext } from "../../context/CartContext";
import { ItemSummary } from "./ItemSummary";
import { ContinueBtn } from "../buttons/ContinueBtn";
import { AppliedCouponCode } from "./AppliedCouponCode";
import SpecialInstruction from "./SpecialInstruction";
import NoCartItem from "../errors/NoCartItem";
import { useCartItemFetch } from "../../hooks/order-items/CartItem";
import { findAccountDiscount } from "../../hooks/coupons/CouponCodes";
import { Constants, LanguageKey } from "../../../../dwtc-common-utility/src";

export function CartPage() {
    const [selectedOption, setSelectedOption] = useState(Constants.TAKEAWAY);

    const {refreshFlag} = useCartContext();

    const {cart, error:cartError, loading:cartLoading} = useCommerceOrderFetch(refreshFlag);

    const {cartItems, error:cartItemError, loading:cartItemLoading} = useCartItemFetch();    
    const { setCartId } = useCartContext();
    console.log(cart);
    const hasRunRef = useRef(false);

    useEffect(() => {
    if (cart?.orderId) {
        setCartId(cart.orderId);
        if (!hasRunRef.current){
            findAccountDiscount(cart);
        }
    }
    }, [cart, setCartId]);

    if (cartLoading){
        return(
            <Loading />
        )
    }

    if (cartError){
        return(<></>)
    }
  
    return (
    <div>
        {cartItems?.items?.length > 0 ? (
            <div className="">
                <ShippingOptionSelectors onSelectionChange={setSelectedOption} />
                
                <div className="">
                    <ItemSummary cartItems={cartItems}/>
                </div>

                <div>
                    <AppliedCouponCode cart={cart}/>
                </div>

                <div>
                    <SpecialInstruction />
                </div>

                <div className="">
                    <PaymentSummary 
                        shippingOptionSelected = {selectedOption}
                    />
                </div>
        
                <ContinueBtn selectedOption={selectedOption} btnName={Liferay.Language.get(LanguageKey.CartPageContinue)} />
            </div>
        ) : (<NoCartItem />)}
    </div>    
    )
}