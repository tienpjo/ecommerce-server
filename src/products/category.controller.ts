import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './models/category.model';

@Controller('products/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('all')
  getAllCategory(): Promise<Category[]> {
    return this.categoryService.getAllCategory();
  }

  @Get('')
  getCategories(): Promise<Category[]> {
    return this.categoryService.getCategory();
  }
}
