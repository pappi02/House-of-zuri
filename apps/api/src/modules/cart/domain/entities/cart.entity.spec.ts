import { Cart } from './cart.entity';
import { CartItem } from './cart-item.entity';

describe('Cart', () => {
  it('calculates totals from snapshot-priced items', () => {
    const cart = new Cart({ currency: 'USD' });
    cart.addItem(new CartItem({ id: 'item-1', productId: 'prod-1', unitPrice: 100, quantity: 2 }));

    expect(cart.subtotal).toBe(200);
    expect(cart.total).toBe(200);
  });

  it('updates quantity and allows clearing', () => {
    const cart = new Cart({ currency: 'USD' });
    const item = new CartItem({ id: 'item-1', productId: 'prod-1', unitPrice: 50, quantity: 1 });
    cart.addItem(item);

    cart.changeQuantity('item-1', 3);
    expect(item.quantity).toBe(3);

    cart.clear();
    expect(cart.items).toHaveLength(0);
  });
});
