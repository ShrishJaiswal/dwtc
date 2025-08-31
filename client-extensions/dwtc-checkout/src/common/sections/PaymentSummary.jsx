import React from "react";
import { Loading } from "../errors/Loading";
import { PaymentSummaryHeader } from "../section-headers/PaymentSummaryHeader";
import LanguageKey from "../../utility/LanguageKey";
import Constants from "../../utility/Constants";
import { fetchCurrency } from "../../utility/Currency";
import { useCartContext } from "../../context/CartContext";
import { useCartFetchById } from "../../hooks/order/Order";
import { ItemSummary } from "./ItemSummary";

export function PaymentSummary({shippingOptionSelected}){

    const {cartId, refreshFlag} = useCartContext();
    const {currency} = fetchCurrency();
    const {cart, error:cartError, loading:cartLoading} = useCartFetchById(cartId, refreshFlag);
    if (cartLoading){
        return (
            <Loading />
        )
    }

    if (cartError){
        return (
            <></>
        )
    }

    return(
        <div className="">
            <PaymentSummaryHeader />
            <table>
                <tbody>
                    <tr>
                        <td>{LanguageKey.SubTotal}</td>
                        <td>{currency?.currencyCode}{cart?.summary.subtotal}</td>
                    </tr>

                    {shippingOptionSelected === Constants.HOMEDELIVERY && (
                        <tr>
                            <td>{LanguageKey.DeliveryCharges}</td>
                            <td>{currency?.currencyCode}</td>
                        </tr>
                    )}

                    <tr>
                        <td>{LanguageKey.OrderTotal}</td>
                        <td>{currency?.currencyCode} {cart?.summary.total}</td>
                    </tr>

                </tbody>
            </table>
        </div>
    )

}