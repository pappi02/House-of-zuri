export class CollectionNotFoundException extends Error {
  constructor(identifier: string) {
    super(`Collection not found: ${identifier}`);
    this.name = 'CollectionNotFoundException';
  }
}