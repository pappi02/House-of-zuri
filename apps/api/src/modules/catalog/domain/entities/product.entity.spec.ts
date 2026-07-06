import { Product } from './product.entity';

describe('Product', () => {
  it('publishes a draft product', () => {
    const product = new Product({
      name: 'Luxury Infinity Dress',
      slug: 'luxury-infinity-dress',
      description: 'A fine evening gown.',
      categoryId: 'cat-1',
      basePrice: 5200,
      currency: 'USD',
      productType: 'READY_MADE',
      status: 'DRAFT',
    });

    product.publish();

    expect(product.status).toBe('ACTIVE');
    expect(product.slug).toBe('luxury-infinity-dress');
  });
});
