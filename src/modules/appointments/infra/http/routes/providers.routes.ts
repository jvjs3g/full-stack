import { Router} from 'express';
import {  parseISO } from 'date-fns'
import { container } from 'tsyringe';

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
ProvidersRouter.get('/:provider_id/month-availability', providerManthAvailabilityController.index);
ProvidersRouter.get('/:provider_id/day-availability', providerDayAvailabilityController.index);

export default ProvidersRouter;
