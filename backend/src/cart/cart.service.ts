import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from './cart.schema';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) {}

  async create(cartData: Partial<Cart>): Promise<Cart> {
    const cart = new this.cartModel(cartData);
    return await cart.save();
  }

  async findAll(userId: string): Promise<Cart[]> {
    console.log(userId);

    const cart = await this.cartModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .exec();
    console.log(cart);
    return cart;
  }

  async findOne(id: string): Promise<Cart> {
    const cart = await this.cartModel.findById(id).exec();
    if (!cart) {
      throw new NotFoundException(`Cart with ID ${id} not found`);
    }
    return cart;
  }

  async update(id: string, cartData: Partial<Cart>): Promise<Cart> {
    const cart = await this.cartModel
      .findByIdAndUpdate(id, { $set: cartData }, { new: true })
      .exec();
    if (!cart) {
      throw new NotFoundException(`Cart with ID ${id} not found`);
    }
    return cart;
  }

  async remove(id: string): Promise<void> {
    const result = await this.cartModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Cart with ID ${id} not found`);
    }
  }

  async clearUserCart(userId: string): Promise<void> {
    await this.cartModel.deleteMany({ userId }).exec();
  }
}
