export class CustomerName {
  constructor(
    public readonly firstName: string,
    public readonly middleName: string | null,
    public readonly lastName: string,
    public readonly preferredName: string | null,
  ) {}

  static from(
    firstName: string,
    middleName: string | null | undefined,
    lastName: string,
    preferredName: string | null | undefined,
  ): CustomerName {
    return new CustomerName(firstName.trim(), middleName?.trim() ?? null, lastName.trim(), preferredName?.trim() ?? null);
  }

  fullName(): string {
    return [this.firstName, this.middleName, this.lastName].filter(Boolean).join(' ').trim();
  }

  displayName(): string {
    return this.preferredName?.trim() || this.firstName.trim() || this.lastName.trim();
  }

  initials(): string {
    return [this.firstName, this.middleName, this.lastName]
      .filter((part): part is string => Boolean(part))
      .map((part) => part.charAt(0).toUpperCase())
      .join('');
  }
}
