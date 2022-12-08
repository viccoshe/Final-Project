import {User} from "firebase/auth";

// export interface IUser {
//     user: User | null,
//     id: string,
//     favProducts: Array<any>,
//     cartProducts: Array<any>,
// }

export interface IUser {
    user: User | null,
    loading: boolean,
    error: null | string,
}

export interface InitialStateType {
    name: string,
    id: string,
    favProducts: Array<any>,
    cartProducts: Array<any>,
};