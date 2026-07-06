import { InvalidProductException } from '../exceptions/invalid-product.exception';

export class Slug {
  private constructor(readonly value: string) {}

  static from(value: string): Slug {
    const normalized = value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    if (!normalized) {
      throw new InvalidProductException('A product slug must contain letters or numbers.');
    }

    return new Slug(normalized);
  }

  static fromName(name: string): Slug {
    return Slug.from(name);
  }
}
