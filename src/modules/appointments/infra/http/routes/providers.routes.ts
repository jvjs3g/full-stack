import { Router} from 'express';
import { celebrate, Segments, Joi } from 'celebrate';


import ProviderController from '../controllers/ProvidersController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProviderMonthAvailabilityController from '../controllers/PorviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/PorviderDayAvailabilityController';

const ProvidersRouter = Router();

const providerController = new ProviderController();
const providerManthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

ProvidersRouter.use(ensureAuthenticated);

ProvidersRouter.get('/', providerController.index);
ProvidersRouter.get('/:provider_id/month-availability',celebrate({
  [Segments.PARAMS]:{
    provider_id: Joi.string().uuid().required(),
  }
}),  providerManthAvailabilityController.index);
ProvidersRouter.get('/:provider_id/day-availability',celebrate({
  [Segments.PARAMS]:{
    provider_id: Joi.string().uuid().required(),
  }
}), providerDayAvailabilityController.index);

export default ProvidersRouter;
