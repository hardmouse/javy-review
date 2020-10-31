// Section 1
import { Action } from '@ngrx/store'
import { User } from './../models/user.model'

// Section 2
export const USER_REG = "[USER] Registration"
export const USER_LOGIN = "[USER] Login"
export const USER_LOGOUT = "[USER] Logout"

// Section 3
export class UserLogin implements Action {
    readonly type = USER_LOGIN

    constructor(public payload: User) {}
}
export class UserLogout implements Action {
    readonly type = USER_LOGOUT

    constructor(public payload: number) {}
}
export class UserRegister implements Action {
    readonly type = USER_REG

    constructor(public payload: any) {}
}

// // Section 4 
export type Actions = UserLogin | UserLogout | UserRegister