import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePostService from '@modules/posts/services/CreatePostService';

export default class AppointmentsController {
  public async create(request: Request ,response: Response ): Promise<Response>{
    
    const user_id = request.user.id;

    const { message } = request.body;

    const createPost =  container.resolve(CreatePostService);

    const post = await createPost.execute({ user_id, message});

    return response.json(post);
  }
}
