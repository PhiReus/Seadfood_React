const ADD_TO_CART = "ADD_TO_CART";
const SET_CART = "SET_CART";
const DECREASE_QUANTITY = "DECREASE_QUANTITY";
const INCREASING_QUANTITY = "INCREASING_QUANTITY";
const REMOVE_CART_ITEM = "REMOVE_CART_ITEM";
const REMOVE_CART = "REMOVE_CART";

export const decreaseQuantity = (productId) => {
    return {
        type: DECREASE_QUANTITY,
        payload: productId
    };
}

export const increasingQuantity = (productId) => {
    return {
        type: INCREASING_QUANTITY,
        payload: productId
    }
}

export const removeCartItem = (productId) => {
    return {
        type: REMOVE_CART_ITEM,
        payload: productId
    }
}
export const removeCart = () => {
    return {
        type: REMOVE_CART,
        payload: []
    }
}
export {ADD_TO_CART, SET_CART, DECREASE_QUANTITY, INCREASING_QUANTITY, REMOVE_CART_ITEM, REMOVE_CART};