import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from './cart.schema';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async create(@Body() cartData: Partial<Cart>): Promise<Cart> {
    return await this.cartService.create(cartData);
  }

  @Get('user/:userId')
  async findAll(@Param('userId') userId: string): Promise<Cart[]> {
    return await this.cartService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Cart> {
    return await this.cartService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() cartData: Partial<Cart>,
  ): Promise<Cart> {
    return await this.cartService.update(id, cartData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.cartService.remove(id);
  }

  @Delete('user/:userId')
  async clearUserCart(@Param('userId') userId: string): Promise<void> {
    await this.cartService.clearUserCart(userId);
  }
}
