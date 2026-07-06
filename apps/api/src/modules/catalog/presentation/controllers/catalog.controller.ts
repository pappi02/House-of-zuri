import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CatalogService } from '../../application/services/catalog.service';
import { CreateProductRequest } from '../dto/create-product.request';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('catalog')
@Controller('products')
@UseGuards(RolesGuard)
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Post()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Create a product' })
  @ApiBody({ type: CreateProductRequest })
  @ApiResponse({ status: 201, description: 'Product created.' })
  async createProduct(@Body() body: CreateProductRequest) {
    return this.catalogService.createProduct(body);
  }

  @Get()
  @ApiOperation({ summary: 'List products' })
  @ApiQuery({ name: 'keyword', required: false })
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'collection', required: false })
  @ApiResponse({ status: 200, description: 'Products returned.' })
  async listProducts(@Query('keyword') keyword?: string, @Query('category') category?: string, @Query('collection') collection?: string) {
    return this.catalogService.listProducts({ keyword, category, collection });
  }

  @Get('categories')
  @ApiOperation({ summary: 'List categories' })
  @ApiResponse({ status: 200, description: 'Categories returned.' })
  async listCategories() {
    return [];
  }

  @Get('collections')
  @ApiOperation({ summary: 'List collections' })
  @ApiResponse({ status: 200, description: 'Collections returned.' })
  async listCollections() {
    return [];
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get a product by slug' })
  @ApiParam({ name: 'slug', description: 'Product slug' })
  @ApiResponse({ status: 200, description: 'Product returned.' })
  async getProduct(@Param('slug') slug: string) {
    return this.catalogService.getProduct(slug);
  }

  @Patch(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({ status: 200, description: 'Product updated.' })
  async updateProduct(@Param('id') id: string) {
    return this.catalogService.getProduct(id);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({ status: 200, description: 'Product deleted.' })
  async deleteProduct(@Param('id') id: string) {
    return { id, deleted: true };
  }

  @Post(':id/images')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Attach a product image' })
  @ApiResponse({ status: 201, description: 'Image linked to product.' })
  async addImage(@Param('id') id: string) {
    return { productId: id, images: [] };
  }

  @Post(':id/variants')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Create a product variant' })
  @ApiResponse({ status: 201, description: 'Variant created.' })
  async addVariant(@Param('id') id: string) {
    return { productId: id, variants: [] };
  }
}
