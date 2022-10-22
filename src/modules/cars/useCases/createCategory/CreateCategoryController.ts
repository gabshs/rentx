import { Request, Response } from 'express';
import { CreateSpecificationUseCase } from '../createSpecification/CreateSpecificationUseCase';

class CreateCategoryController {
  constructor(private createSpecificationUseCase: CreateSpecificationUseCase) {}
  handle(request: Request, response: Response): Response {
    const { name, description } = request.body;

    this.createSpecificationUseCase.execute({ name, description });

    return response.status(201).send();
  }
}

export { CreateCategoryController };
