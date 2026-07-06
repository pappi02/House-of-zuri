export enum CategoryStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export const CategoryStatusValues = Object.values(CategoryStatus);
export type CategoryStatusValue = (typeof CategoryStatusValues)[number];