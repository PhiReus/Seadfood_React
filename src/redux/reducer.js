import { ADD_TO_CART, DECREASE_QUANTITY, INCREASING_QUANTITY, REMOVE_CART, REMOVE_CART_ITEM, SET_CART } from "./action";

let cart = localStorage.getItem('cart');
cart = cart ? JSON.parse(cart) : [];

const initialState = {
    cart : cart
}

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                cart: [...state.cart, action.payload],
            };
        case SET_CART:
            return {
                ...state, cart: action.payload
            }    
        case DECREASE_QUANTITY:
            return {
                ...state,
                cart: state.cart.map((cartItem) => 
                    cartItem.product.id === action.payload && cartItem.quantity > 1 ?
                    {...cartItem, quantity: cartItem.quantity - 1} : cartItem,
                ),
            }
        case INCREASING_QUANTITY:
            return {
                ...state,
                cart: state.cart.map((cartItem) => 
                cartItem.product.id === action.payload ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem)
            }        
        case REMOVE_CART_ITEM: 
            return {
                ...state,
                cart: state.cart.filter(cartItem => cartItem.product.id !== action.payload)
            }    
        case REMOVE_CART:
            return {
                ...state, cart: action.payload
            }    
        default:
            return state;
    }
}
export default rootReducer;