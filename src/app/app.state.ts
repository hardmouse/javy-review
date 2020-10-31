import { User } from './models/user.model'
import { Post } from './models/post.model'
export interface AppState{
  readonly user: User[];
  readonly post: Post[];
}
