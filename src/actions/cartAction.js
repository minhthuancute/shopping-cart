import {
   ADD_CART,
   REMOVE_CART
} from './type'

export const addCart = (product, price, input) => {
   return dispatch => {
      dispatch({
         type: ADD_CART,
         product,
         price,
         input
      })
   }
}

export const removeCart = (id) => {
   return dispatch => {
      dispatch({
         type: REMOVE_CART,
         id
      })
   }
}