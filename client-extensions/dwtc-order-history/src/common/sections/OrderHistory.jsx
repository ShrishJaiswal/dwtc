import React, { useState } from "react";
import { useOrderListFetch } from "../../hooks/OrderList";
import { useCartItemFetch } from "../../hooks/CartItem";
import { useNavigate } from "react-router-dom";
import { AdaptiveMediaImgParser } from "../../utility/AdaptiveMediaParser";
import { LanguageKey, Loading } from "../../../../dwtc-common-utility/src";
import useOrderFeedbackCalculation from "../../hooks/OrderFeedbackCalculation";

function OrderItem({ order }) {
    
    if (!order?.id) {
        return null;
    }

    const { cartItems, error:cartItemError, loading:cartItemLoading } = useCartItemFetch({ cartId: order.id });
    const {averageRating, error:averageRatingError, loading:ratingLoading} = useOrderFeedbackCalculation({cartId : order.id});

    const navigate = useNavigate();

    const handleFeedbackBtnClick = () => {
        navigate(`/feedbackrating/${order.id}/${order.externalReferenceCode}`);
    }

    const formatDate = (rawDate) => {
        if (!rawDate) return "";
        const date = new Date(rawDate);
      
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
      
        return `${day}/${month}/${year}`;
    }
    
    const itemNames = cartItems?.items?.map(item => item?.name).join(", ") || "";

    const totalStars = 5;
    const filledStars = Math.round(averageRating || 0);

    return (
        <div className="order_box1">
            <div class="order_box1">
                <div class="img_box">
                    <img src="images/order_history_food_img.png" alt="" />
                    <div class="rating_box">
                        <span>
                            <AdaptiveMediaImgParser adaptiveMediaImageHTMLTag={cartItems?.items?.[0].adaptiveMediaImageHTMLTag} />
                        </span>
                    </div>
                </div>
                <div className="rating-box">
                    <div className="rating-container">
                        {[...Array(5)].map((_, idx) => (
                        <div key={idx}>
                            <input
                            type="radio"
                            name={`rating-${order.id}`}   // unique per order
                            value={idx + 1}
                            id={`star-${order.id}-${idx + 1}`}
                            checked={filledStars === idx + 1}
                            disabled
                            readOnly
                            />
                            <label htmlFor={`star-${order.id}-${idx + 1}`}>&#9733;</label>
                        </div>
                        ))}
                    </div>
                    {!ratingLoading && <p>({averageRating?.toFixed(1) || 0})</p>}
                </div>
                <div class="main_txt_box">
                    <div class="txt_box">
                        <h5>{itemNames}</h5>
                    </div>
                    <div class="txt_box txt_box2">
                        <div class="rating_box">
                            <span class="share_btn_box">
                                <button onClick={handleFeedbackBtnClick}>{LanguageKey.SHARE_MORE_FEEDBACK}</button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="order_box2">
                <div class="inner_box1">
                    <div class="txt_box">
                        <h6>
                            {LanguageKey.ORDER_CREATED_ON}{formatDate(order?.createDate)}
                        </h6>

                    </div>
                </div>
                <div class="inner_box2">
                    <h4>
                        <a href="javascript:;">
                            {order.totalFormatted}
                        </a>
                    </h4>
                </div>
            </div>
        </div>
    );
}

export default function OrderHistory(){

    const {orderList:orderList, error:orderListError, loading:orderListLoading} = useOrderListFetch();

    if (orderListError){
        return(
            <Error text={ErrorConstants.EXCEPTION_NO_ORDER_HISTORY_PRESENT} />
        )
    }

    if (orderListLoading){
        return(
            <Loading />
        )
    }
    
    const activeOrders = orderList?.items?.filter(order => order.orderStatusInfo.code !== 0) || [];
    const pastOrders = orderList?.items?.filter(order => order.orderStatusInfo.code === 0) || [];

    return(
        <div>
            <section class="Order_History_Section">
                <div class="hospi_order_history_wrapper hospi_order_history_wrapper2">
                    <div class="container">
                        <div class="order_history_main_wrap">
                            <div class="order_history_wrapper">
                                <h3 class="title_box">
                                    {LanguageKey.ACTIVE_ORDER_HEADING}
                                </h3>
                                <div class="order_history_box">
                                    {activeOrders.length === 0 && <p>{LanguageKey.NO_ACTIVE_ORDERS}</p>}
                                    {activeOrders.map((order) => (
                                        <OrderItem key={order.id} order={order} />
                                    ))}                                    
                                </div>
                            </div>
                            <div class="order_history_wrapper">
                                <h3 class="title_box">
                                    {LanguageKey.PAST_ORDER_HEADING}
                                </h3>
                                <div class="order_history_box">
                                    {pastOrders.length === 0 && <p>{LanguageKey.NO_PAST_ORDERS}</p>}
                                    {pastOrders.map((order) => (
                                        <OrderItem key={order.id} order={order} />
                                    ))} 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}