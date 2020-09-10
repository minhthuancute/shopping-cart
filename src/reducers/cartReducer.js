import {
   ADD_CART,
   REMOVE_CART
} from '../actions/type'

const localStore = localStorage.getItem('carts');
const initialState = localStore ? JSON.parse(localStore) : [];

const cartReducer = (state = initialState, action) => {
   switch (action.type) {
      case ADD_CART: {
         console.log(action.input)
         const index = state.findIndex(val => val.id === action.product.id);
         const res = index === -1 ? [...state, {
            ...action.product,
            price: action.input === 0 ? action.product.price : action.input
         }] : [...state.slice(0, index), {
            ...state[index],
            price: state[index].price + action.input
         }, ...state.slice(index + 1)];
         localStorage.setItem('carts', JSON.stringify(res));
         return res;
      }

      case REMOVE_CART: {
         const res = state.filter(val => val.id !== action.id);
         localStorage.setItem('carts', JSON.stringify(res));
         return res;
      }

      default:
         return state;
   }
}

export default cartReducer