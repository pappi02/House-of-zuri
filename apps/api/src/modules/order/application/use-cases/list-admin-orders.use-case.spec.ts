import { ListAdminOrdersUseCase } from './list-admin-orders.use-case';

describe('ListAdminOrdersUseCase', () => {
  it('returns paginated shape and computes totalPages', async () => {
    const mockRepo = {
      listAdminOrders: async ({ page, pageSize }: any) => {
        const total = 45;
        const items = Array.from({ length: Math.min(pageSize, total - (page - 1) * pageSize) }, (_, i) => ({ id: `id-${i}` }));
        return { items, total };
      },
    } as any;

    const uc = new ListAdminOrdersUseCase(mockRepo);
    const res = await uc.execute({ page: 2, pageSize: 10 });
    expect(res.page).toBe(2);
    expect(res.pageSize).toBe(10);
    expect(res.totalItems).toBe(45);
    expect(res.totalPages).toBe(Math.ceil(45 / 10));
    expect(Array.isArray(res.items)).toBe(true);
  });
});
