import { CartModel } from 'src/cart/models/cart.model';
import { Product } from 'src/products/models/products.model';

export const solveProduct = (p: Product): Product => ({
  _id: p._id,
  title: p.title,
  mainImage: p.mainImage,
  images: p.images,
  category: p.category,
  _user: p._user,
  createdAt: p.createdAt,
  description: p.description,
  descriptionFull: p.descriptionFull,
  ...{ ...p },
});

export const solveCart = (cart): CartModel => {
  const cartItems = cart.items.length
    ? cart.items
        .map(cartItem => {
          const preItem = solveProduct(cartItem);
          const price: number = cartItem.salePrice;
          return {
            item: preItem,
            id: cartItem._id,
            qty: cartItem.qty,
            price,
          };
        })
        .filter(cartItem => cartItem.item.visibility && cartItem.item.salePrice)
    : [];

  const { totalPrice, totalQty }: { totalQty: number; totalPrice: number } =
    cartItems.reduce(
      (prev, item) => ({
        totalPrice: prev.totalPrice + item.price * item.qty,
        totalQty: prev.totalQty + item.qty,
      }),
      { totalPrice: 0, totalQty: 0 },
    );

  return {
    items: cartItems,
    totalPrice,
    totalQty,
  };
};
