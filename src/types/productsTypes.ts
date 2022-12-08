export interface IProduct {
    id: string,
}

interface IUser {
    id: string,
    name: string,
    favProducts: Array<IProduct> | null,
    cartProducts: Array<IProduct> | null,
}

export interface InitialProductsState {
    user: IUser | null,
    loading: boolean,
    error: string | null,
    success: string | null,
}

export enum ProductsActionTypes {
    FETCH_PRODUCT = "FETCH_PRODUCT",
    SET_PRODUCT = "SET_PRODUCT",
    GET_PRODUCT = "GET_PRODUCT",
    REMOVE_PRODUCT = "REMOVE_PRODUCT",
    ERROR_PRODUCT = "ERROR_PRODUCT",
}

export interface FetchProductAction {
    type: ProductsActionTypes.FETCH_PRODUCT,
}

export interface SetProductAction {
    type: ProductsActionTypes.SET_PRODUCT,
    payload: string,
}

export interface GetProductAction {
    type: ProductsActionTypes.GET_PRODUCT,
    payload: IProduct | null,
}

export interface RemoveProductAction {
    type: ProductsActionTypes.REMOVE_PRODUCT,
    payload: string,
}

export interface ErrorProductAction {
    type: ProductsActionTypes.ERROR_PRODUCT,
    payload: string,
}

export type PActionTypes =  
            FetchProductAction 
          | SetProductAction 
          | GetProductAction 
          | RemoveProductAction
          | ErrorProductAction;



