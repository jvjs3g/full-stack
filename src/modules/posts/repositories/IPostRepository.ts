import Post from '@modules/posts/infra/typeorm/entities/Post';
import ICraetePostDTO from '@modules/posts/dtos/ICreatePostDTO';

export default interface IPostRepository {
  create(data:ICraetePostDTO):Promise<Post>;
}