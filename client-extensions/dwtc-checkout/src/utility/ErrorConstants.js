import LanguageKey from "./LanguageKey";

const ErrorConstants = {
    "CHANNEL_ERR" : "channelFindError",
    "OPEN_ORDER_ERR" : "openOrderError",
    "CART_ERR" : "openOrderCartItemError",
    "CART_BY_ID_ERR" : "errorWhileFetchingCartById",
    "COUPON_CODES_ALL_ERR" : "errorWhileFetchingAllCouponCodes",
    "COUPON_NOT_FOUND" : LanguageKey.CouponNotFound
}

export default ErrorConstants;