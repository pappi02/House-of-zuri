import { Prisma } from '@prisma/client';

export type CustomerTransactionClient = Prisma.TransactionClient;

export type CustomerTransactionCallback<T> = (tx: CustomerTransactionClient) => Promise<T>;
