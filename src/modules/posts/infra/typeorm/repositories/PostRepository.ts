import { getRepository } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';

import IPostRepository from "@modules/posts/repositories/IPostRepository";



import ICreatePostDTO from '@modules/posts/dtos/ICreatePostDTO';

import Post from '../entities/Post';


class PostRepository  implements IPostRepository {
  private ormRepository: Repository<Post>;

  constructor(){
    this.ormRepository = getRepository(Post);
  }

  public async create({ message, user_id }: ICreatePostDTO): Promise<Post>{
    const post =  this.ormRepository.create({
      user_id,
      message
    });

    await this.ormRepository.save(post);

    return post;
  }
}

export default PostRepository;

