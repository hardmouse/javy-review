import { Action } from '@ngrx/store'
import { User } from './../models/user.model'
import * as UserActions from './../actions/user.actions'

export const initUser: User = {
    access: 'hold',
    nick: 'Reviewer',
    user: 0,
    image: 'reviews.png',
    token: '',
    color: '00C379'
}

export function userReducer(state: User[] = [initUser], action: UserActions.Actions){
    console.log(action.type, " <====> ", state);
    switch(action.type){
        case UserActions.USER_LOGOUT:
            return [...state, action.payload];
        case UserActions.USER_LOGIN:
            return [...state, action.payload];
        case UserActions.USER_REG:
            return [...state, action.payload];
        default:
            return state;
    }
}