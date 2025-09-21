import LanguageKey from "./LanguageKey";

const ErrorConstants = {
    EXCEPTION_CART_ITEM_FETCH : Liferay.Language.get("dwtc-cart-item-fetch-error"),
    EXCEPTION_SOMETHING_WENT_WRONG : Liferay.Language.get("dwtc-something-went-wrong"),
    EXCEPTION_NO_ORDER_HISTORY_PRESENT : Liferay.Language.get("dwtc-no-order-history-present"),
    EXCEPTION_RATING_LIST_ERROR : Liferay.Language.get("dwtc-rating-list-error"),
    EXCEPTION_ADDRESS_FETCH : Liferay.Language.get("dwtc-address-fetch-error"),
    "CHANNEL_ERR" : "channelFindError",
    "OPEN_ORDER_ERR" : "openOrderError",
    "CART_ERR" : "openOrderCartItemError",
    "CART_BY_ID_ERR" : "errorWhileFetchingCartById",
    "COUPON_CODES_ALL_ERR" : "errorWhileFetchingAllCouponCodes",
    "COUPON_NOT_FOUND" : LanguageKey.CouponNotFound,
    NO_OPEN_ORDER_FOUND : Liferay.Language.get("dwtc-no-open-order-found"),
}

export default ErrorConstants;