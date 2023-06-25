import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { GetProductsDto } from './models/dto/get-products.dto';
import { ProductDto } from './models/dto/products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post('add')
  addProduct(@Body() productReq): Promise<void> {
    return this.productService.addProduct(productReq);
  }

  @Get()
  getProducts(@Query() getProductsDto: GetProductsDto): Promise<ProductDto> {
    return this.productService.getProducts(getProductsDto);
  }
}
