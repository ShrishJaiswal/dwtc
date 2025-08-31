import Constants from "./Constants";

export function findCommerceOrderCookie(){
    const searchString = Constants.COMMERCE_ORDER_COOKIE;
    const allCookies = document.cookie.split(';');

    for (let cookie of allCookies) {
        cookie = cookie.trim();

        if (cookie.startsWith(searchString)) {
            return cookie.substring(cookie.indexOf('=') + 1);
        }
    }

    return null;
}

function findCookieByName(name){
    const searchString = Constants.COMMERCE_ORDER_COOKIE;
    const allCookies = document.cookie.split(';');

    for (let cookie of allCookies) {
        cookie = cookie.trim();

        if (cookie.startsWith(searchString)) {
            return cookie;
        }
    }

    return null;
}

export function eraseCookie(name) {

    document.cookie = findCookieByName(name) + '=; Max-Age=0; path=/;';
}