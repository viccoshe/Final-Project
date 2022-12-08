import { InitialProductsState, ProductsActionTypes, PActionTypes } from "../../types/productsTypes";

const initialState: InitialProductsState = {
    user: {
        id: '',
        name: '',
        favProducts: null,
        cartProducts: null,
    },
    loading: false,
    error: null,
    success: null,
}

export const productsReducer = (state = initialState, action: PActionTypes)  => {
    switch (action.type) {
        case ProductsActionTypes.FETCH_PRODUCT:
            return {user: state.user, loading: true, error: null, success: ''};
        case ProductsActionTypes.SET_PRODUCT:
            return {user: null, loading: false, error: null, success: action.payload};
        case ProductsActionTypes.GET_PRODUCT:
            return {user: state.user, loading: false, error: null, success: action.payload};
        case ProductsActionTypes.REMOVE_PRODUCT:
            return {user: state.user, loading: false, error: null, success: action.payload};
        case ProductsActionTypes.ERROR_PRODUCT:
            return {user: state.user, loading: false, error: action.payload, success: null};
        default:
            return state;
    }
}