// Section 1
import { Action } from '@ngrx/store'
import { Post } from './../models/post.model'

// Section 2
export const POST_PUBLISH = "[POST] Publish"
export const POST_VIEW = "[POST] View"
export const POST_DELETE = "[POST] Delete"

// Section 3
export class PostPublish implements Action {
    readonly type = POST_PUBLISH

    constructor(public payload: Post) {}
}
export class PostView implements Action {
    readonly type = POST_VIEW

    constructor(public payload: number) {}
}
export class PostDelete implements Action {
    readonly type = POST_DELETE

    constructor(public payload: any) {}
}

// // Section 4 
export type Actions = PostPublish | PostView | PostDelete