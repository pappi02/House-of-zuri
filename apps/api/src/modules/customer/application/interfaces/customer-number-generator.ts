export interface CustomerNumberGenerator {
  generate(): Promise<string>;
}
