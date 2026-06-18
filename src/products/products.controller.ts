import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService, Product } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // GET /products/available  ← harus SEBELUM :id agar tidak tertangkap sebagai id
  @Get('available')
  findAvailable(): Product[] {
    return this.productsService.findAvailable();
  }

  // GET /products/category/:category
  @Get('category/:category')
  findByCategory(
    @Param('category') category: string,
  ): Product[] | { message: string } {
    const results = this.productsService.findByCategory(category);
    if (results.length === 0) {
      return { message: `Tidak ada produk dalam kategori "${category}"` };
    }
    return results;
  }

  // GET /products
  @Get()
  findAll(): Product[] {
    return this.productsService.findAll();
  }

  // GET /products/:id
  @Get(':id')
  findOne(@Param('id') id: string): Product | { message: string } {
    const product = this.productsService.findOne(parseInt(id));
    if (!product) {
      return { message: `Produk dengan ID ${id} tidak ditemukan` };
    }
    return product;
  }

  // POST /products
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() body: Omit<Product, 'id' | 'createdAt'>,
  ): Product | { message: string } {
    if (!body.name) return { message: 'Field "name" wajib diisi' };
    if (body.price === undefined) return { message: 'Field "price" wajib diisi' };
    if (!body.category) return { message: 'Field "category" wajib diisi' };
    if (body.stock === undefined) return { message: 'Field "stock" wajib diisi' };
    if (body.isAvailable === undefined)
      return { message: 'Field "isAvailable" wajib diisi' };
    return this.productsService.create(body);
  }

  // PUT /products/:id
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: Partial<Omit<Product, 'id' | 'createdAt'>>,
  ): Product | { message: string } {
    const updated = this.productsService.update(parseInt(id), body);
    if (!updated) {
      return { message: `Produk dengan ID ${id} tidak ditemukan` };
    }
    return updated;
  }

  // DELETE /products/:id
  @Delete(':id')
  delete(@Param('id') id: string): { message: string } {
    const deleted = this.productsService.delete(parseInt(id));
    if (!deleted) {
      return { message: `Produk dengan ID ${id} tidak ditemukan` };
    }
    return { message: `Produk dengan ID ${id} berhasil dihapus` };
  }
}
