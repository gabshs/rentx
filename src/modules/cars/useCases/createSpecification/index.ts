import { SpecificationsRepository } from '../../repositories/implementations/SpecificationsRepository';
import { CreateCategoryController } from '../createCategory/CreateCategoryController';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

const specificationsRepository = SpecificationsRepository.getInstance();
const createSpecificationUseCase = new CreateSpecificationUseCase(
  specificationsRepository,
);
const createSpecificationController = new CreateCategoryController(
  createSpecificationUseCase,
);

export { createSpecificationController };
