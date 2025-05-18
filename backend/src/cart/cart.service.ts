import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  async create(cartData: Partial<Cart>): Promise<Cart> {
    const cart = this.cartRepository.create(cartData);
    return await this.cartRepository.save(cart);
  }

  async findAll(userId: string): Promise<Cart[]> {
    return await this.cartRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Cart> {
    const cart = await this.cartRepository.findOne({ where: { id } });
    if (!cart) {
      throw new NotFoundException(`Cart with ID ${id} not found`);
    }
    return cart;
  }

  async update(id: number, cartData: Partial<Cart>): Promise<Cart> {
    await this.cartRepository.update(id, cartData);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.cartRepository.delete(id);
  }

  async clearUserCart(userId: string): Promise<void> {
    await this.cartRepository.delete({ userId });
  }
} 