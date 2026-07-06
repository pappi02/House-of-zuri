import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';

describe('Order', () => {
  it('calculates totals from snapshot-priced items', () => {
    const order = new Order({ currency: 'USD' });
    order.addItem(new OrderItem({ productId: 'prod-1', productName: 'Dress', quantity: 2, unitPrice: 75 }));

    expect(order.subtotal).toBe(150);
    expect(order.grandTotal).toBe(150);
  });

  it('derives fulfillment type from product type', () => {
    const order = new Order({ currency: 'USD' });
    order.addItem(new OrderItem({ productId: 'prod-2', productName: 'Custom Gown', productType: 'CUSTOM', quantity: 1, unitPrice: 300 }));

    expect(order.items[0].fulfillmentType).toBe('PRODUCTION');
  });

  it('supports cancellation and note updates', () => {
    const order = new Order({ currency: 'USD' });
    order.cancel();
    order.updateNotes('Customer requested cancellation.');

    expect(order.status).toBe('CANCELLED');
    expect(order.notes).toBe('Customer requested cancellation.');
  });
});
