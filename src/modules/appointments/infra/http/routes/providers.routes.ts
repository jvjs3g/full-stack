import { Router} from 'express';
import {  parseISO } from 'date-fns'
import { container } from 'tsyringe';

import ProviderController from '../controllers/ProvidersController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';


const ProvidersRouter = Router();

const providerController = new ProviderController();

ProvidersRouter.use(ensureAuthenticated);

ProvidersRouter.get('/', providerController.index);

export default ProvidersRouter;
