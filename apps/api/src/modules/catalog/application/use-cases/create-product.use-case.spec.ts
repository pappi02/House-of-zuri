import { CreateProductUseCase } from './create-product.use-case';

describe('CreateProductUseCase', () => {
  it('creates a product when slug is available', async () => {
    const repository = {
      findBySlug: jest.fn().mockResolvedValue(null),
      findById: jest.fn(),
      findByProductNumber: jest.fn(),
      list: jest.fn(),
      save: jest.fn().mockImplementation(async (product) => product),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const useCase = new CreateProductUseCase(repository as any);
    const result = await useCase.execute({
      name: 'Luxury Infinity Dress',
      basePrice: 5200,
      productType: 'READY_MADE',
    });

    expect(result.slug).toBe('luxury-infinity-dress');
    expect(result.status).toBe('DRAFT');
  });
});
