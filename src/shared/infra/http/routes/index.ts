import { Router } from 'express';
import { authenticateRoutes } from '@shared/infra/http/routes/authenticate.routes';
import { categoriesRoutes } from '@shared/infra/http/routes/categories.routes';
import { specificationsRoutes } from '@shared/infra/http/routes/specifications.routes';
import { userRoutes } from '@shared/infra/http/routes/users.routes';

const router = Router();

router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);
router.use('/users', userRoutes);
router.use(authenticateRoutes);

export { router };
