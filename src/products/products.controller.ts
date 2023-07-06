import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { GetProductsDto } from './models/dto/get-products.dto';
import { ProductDto } from './models/dto/products.dto';
import { Product } from './models/products.model';

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

  @Get('findByName/:name')
  getProductByName(@Param('name') name: string): Promise<Product> {
    return this.productService.getProductByName(name);
  }

  @Get('search/:title')
  getProductSearch(@Param('title') title: string): Promise<string[]> {
    const productFound = this.productService.getProductSearch(title);
    return productFound;
  }
}
