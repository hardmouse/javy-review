import { Action } from '@ngrx/store'
import { Post } from './../models/post.model'
import * as PostActions from './../actions/post.actions'

export const initUser: Post = {
    user_id:0,
    catagory:'general,',
    date:'2020-12-31',
    edit_date:null,
    title:'General',
    body:'',
    images:'',
    post_video_url:'',
    post_privilege:'public'
}

export function postReducer(state: Post[] = [initUser], action: PostActions.Actions){
    console.log(action.type, " <====> ", state);
    switch(action.type){
        case PostActions.POST_PUBLISH:
            return [...state, action.payload];
        case PostActions.POST_VIEW:
            return [...state, action.payload];
        case PostActions.POST_DELETE:
            return [...state, action.payload];
        default:
            return state;
    }
}