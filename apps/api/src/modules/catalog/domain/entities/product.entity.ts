import { randomUUID } from 'crypto';
import { BaseEntity } from './base.entity';
import { ProductStatus, ProductStatusValues } from '../enums/product-status.enum';
import { ProductType, ProductTypeValues } from '../enums/product-type.enum';
import { InvalidProductException } from '../exceptions/invalid-product.exception';
import { ProductNumber } from '../value-objects/product-number.vo';
import { Slug } from '../value-objects/slug.vo';

export interface ProductProps {
  id?: string;
  productNumber?: string;
  name: string;
  slug?: string;
  description?: string | null;
  shortDescription?: string | null;
  categoryId?: string | null;
  collectionId?: string | null;
  productType: ProductType;
  status?: ProductStatus;
  basePrice: number;
  currency?: string;
  featured?: boolean;
  newArrival?: boolean;
  careInstructions?: string | null;
  estimatedProductionDays?: number | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Product extends BaseEntity {
  private _productNumber: ProductNumber;
  private _name: string;
  private _slug: Slug;
  private _description: string | null;
  private _shortDescription: string | null;
  private _categoryId: string | null;
  private _collectionId: string | null;
  private _productType: ProductType;
  private _status: ProductStatus;
  private _basePrice: number;
  private _currency: string;
  private _featured: boolean;
  private _newArrival: boolean;
  private _careInstructions: string | null;
  private _estimatedProductionDays: number | null;
  private _seoTitle: string | null;
  private _seoDescription: string | null;

  constructor(props: ProductProps) {
    super(props.id ?? randomUUID(), props.createdAt ?? new Date(), props.updatedAt ?? new Date());
    this._productNumber = ProductNumber.from(props.productNumber ?? 'PRD-000000');
    this._name = props.name.trim();
    this._slug = Slug.fromName(props.slug ?? props.name);
    this._description = props.description ?? null;
    this._shortDescription = props.shortDescription ?? null;
    this._categoryId = props.categoryId ?? null;
    this._collectionId = props.collectionId ?? null;
    this._productType = props.productType;
    this._status = props.status ?? 'DRAFT';
    this._basePrice = props.basePrice;
    this._currency = props.currency ?? 'USD';
    this._featured = props.featured ?? false;
    this._newArrival = props.newArrival ?? false;
    this._careInstructions = props.careInstructions ?? null;
    this._estimatedProductionDays = props.estimatedProductionDays ?? null;
    this._seoTitle = props.seoTitle ?? null;
    this._seoDescription = props.seoDescription ?? null;

    this.ensureValidState();
  }

  get productNumber(): string { return this._productNumber.value; }
  get name(): string { return this._name; }
  get slug(): string { return this._slug.value; }
  get description(): string | null { return this._description; }
  get shortDescription(): string | null { return this._shortDescription; }
  get categoryId(): string | null { return this._categoryId; }
  get collectionId(): string | null { return this._collectionId; }
  get productType(): ProductType { return this._productType; }
  get status(): ProductStatus { return this._status; }
  get basePrice(): number { return this._basePrice; }
  get currency(): string { return this._currency; }
  get featured(): boolean { return this._featured; }
  get newArrival(): boolean { return this._newArrival; }
  get careInstructions(): string | null { return this._careInstructions; }
  get estimatedProductionDays(): number | null { return this._estimatedProductionDays; }
  get seoTitle(): string | null { return this._seoTitle; }
  get seoDescription(): string | null { return this._seoDescription; }

  publish(): void {
    if (this._status === 'ARCHIVED') {
      throw new InvalidProductException('Archived products cannot be published again.');
    }

    this._status = 'ACTIVE';
    this.touch();
  }

  archive(): void {
    this._status = 'ARCHIVED';
    this.touch();
  }

  markOutOfStock(): void {
    this._status = 'OUT_OF_STOCK';
    this.touch();
  }

  updatePrice(price: number): void {
    if (price < 0) {
      throw new InvalidProductException('Product price cannot be negative.');
    }

    this._basePrice = price;
    this.touch();
  }

  private ensureValidState(): void {
    if (!this._name) {
      throw new InvalidProductException('Product name is required.');
    }

    if (!this._basePrice || this._basePrice < 0) {
      throw new InvalidProductException('Product base price must be greater than or equal to zero.');
    }

    if (!ProductTypeValues.includes(this._productType)) {
      throw new InvalidProductException('Product type is invalid.');
    }

    if (!ProductStatusValues.includes(this._status)) {
      throw new InvalidProductException('Product status is invalid.');
    }
  }
}
