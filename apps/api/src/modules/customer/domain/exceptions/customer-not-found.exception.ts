export class CustomerNotFoundException extends Error {
  constructor(id: string) {
    super(`Customer with id ${id} was not found.`);
    this.name = 'CustomerNotFoundException';
  }
}
