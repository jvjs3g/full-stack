import { injectable, inject } from 'tsyringe';

import Post from "../infra/typeorm/entities/Post";
import AppError from '@shared/errors/AppError';

import IPostRepository from '../repositories/IPostRepository';

interface IRequest{
  user_id: string;
  message:string;
}

@injectable()
class CreatePostService{
  constructor(
    @inject('PostRepository')
    private postRepository:IPostRepository,
    ){

  }

  public async  execute({ message, user_id }: IRequest): Promise<Post>{
      const post = await this.postRepository.create({
        message,
        user_id
      });

      return post;
  }
}


export default CreatePostService;
