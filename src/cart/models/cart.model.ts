//import { getModelForClass, prop } from '@typegoose/typegoose';
import { Product } from 'src/products/models/products.model';

export interface CartModel {
  totalQty?: number;
  totalPrice?: number;
  shippingCost?: number;
  shippingLimit?: number;
  shippingType?: string;
  items: Product[];
}
