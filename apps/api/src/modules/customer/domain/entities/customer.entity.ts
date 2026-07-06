import { CustomerStatusValues, type CustomerStatus } from '../enums/customer-status.enum';
import { InvalidCustomerException } from '../exceptions/invalid-customer.exception';
import { CustomerName } from '../value-objects/customer-name.vo';
import { CustomerNumber } from '../value-objects/customer-number.vo';
import { Email } from '../value-objects/email.vo';
import { Phone } from '../value-objects/phone.vo';
import { BaseEntity } from './base.entity';

export interface CustomerProps {
  id?: string;
  accountId?: string | null;
  customerNumber?: string;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  preferredName?: string | null;
  email: string;
  phone: string;
  isGuest?: boolean;
  status?: CustomerStatus;
  marketingOptIn?: boolean;
  notes?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Customer extends BaseEntity {
  private _accountId: string | null;
  private _customerNumber: CustomerNumber;
  private _name: CustomerName;
  private _email: Email;
  private _phone: Phone;
  private _isGuest: boolean;
  private _status: CustomerStatus;
  private _marketingOptIn: boolean;
  private _notes: string | null;

  constructor(props: CustomerProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._accountId = props.accountId ?? null;
    this._customerNumber = CustomerNumber.from(props.customerNumber ?? CustomerNumber.generate().value);
    this._name = CustomerName.from(props.firstName, props.middleName, props.lastName, props.preferredName);
    this._email = Email.from(props.email);
    this._phone = Phone.from(props.phone);
    this._isGuest = props.isGuest ?? true;
    this._status = props.status ?? 'ACTIVE';
    this._marketingOptIn = props.marketingOptIn ?? false;
    this._notes = props.notes ?? null;

    if (!this.isValidStatus(this._status)) {
      throw new InvalidCustomerException('Customer status cannot be null or invalid.');
    }
  }

  get accountId(): string | null {
    return this._accountId;
  }

  get customerNumber(): string {
    return this._customerNumber.value;
  }

  get name(): CustomerName {
    return this._name;
  }

  get firstName(): string {
    return this._name.firstName;
  }

  get middleName(): string | null {
    return this._name.middleName;
  }

  get lastName(): string {
    return this._name.lastName;
  }

  get preferredName(): string | null {
    return this._name.preferredName;
  }

  get email(): string {
    return this._email.value;
  }

  get phone(): string {
    return this._phone.value;
  }

  get isGuest(): boolean {
    return this._isGuest;
  }

  get status(): CustomerStatus {
    return this._status;
  }

  get marketingOptIn(): boolean {
    return this._marketingOptIn;
  }

  get notes(): string | null {
    return this._notes;
  }

  updateName(firstName: string, lastName: string, middleName?: string | null, preferredName?: string | null): void {
    this._name = CustomerName.from(firstName, middleName ?? null, lastName, preferredName ?? null);
    this.touch();
  }

  updatePhone(phone: string): void {
    this._phone = Phone.from(phone);
    this.touch();
  }

  updateEmail(email: string): void {
    this._email = Email.from(email);
    this.touch();
  }

  enableMarketing(): void {
    this._marketingOptIn = true;
    this.touch();
  }

  disableMarketing(): void {
    this._marketingOptIn = false;
    this.touch();
  }

  block(): void {
    this._status = 'BLOCKED';
    this.touch();
  }

  deactivate(): void {
    this._status = 'INACTIVE';
    this.touch();
  }

  activate(): void {
    if (this._status === 'BLOCKED') {
      throw new InvalidCustomerException('Blocked customers cannot be activated without explicit approval.');
    }

    this._status = 'ACTIVE';
    this.touch();
  }

  convertGuestToRegistered(): void {
    if (!this._isGuest) {
      throw new InvalidCustomerException('Registered customers cannot become guests again.');
    }

    this._isGuest = false;
    this.touch();
  }

  updateNotes(notes: string | null): void {
    this._notes = notes;
    this.touch();
  }

  private isValidStatus(status: string): status is CustomerStatus {
    return CustomerStatusValues.includes(status as CustomerStatus);
  }
}
