# API Contract Audit — House of Zuri

Generated: 2026-07-06

This audit compares frontend API clients in `apps/web/src/features/admin/*/api` against backend controllers and mappers in `apps/api/src/modules/*/presentation` and `.../infrastructure`.

Summary
-------
- ✅ Products: `/products` — controller present, frontend mapping adapts fields.
- ⚠ Orders: frontend calls `GET /orders` for admin list; backend `orders` controller provides customer-scoped listing and order endpoints. There's no dedicated `admin/orders` listing endpoint.
- ✅ Customers: frontend calls `/admin/customers`, backend `AdminCustomerController` exists and returns presenter shapes.
- ✅ Inventory: frontend expects `/inventory` and item endpoints (`/inventory/:id`, `/inventory/variants/:productId/:variantId`) — backend `InventoryController` exposes these. Mapper shows fields `on_hand`, `reserved` -> mapped to `onHand`, `reserved` (matches frontend DTO).
- ✅ Manufacturing: frontend calls `/admin/manufacturing/jobs` and `/admin/manufacturing/jobs/:id` — controller exists and supports creating jobs and work-orders.
- ⚠ Manufacturing timeline: frontend timeline hooks exist but backend does not expose a generic timeline GET endpoint for manufacturing jobs/work-orders.
- ✅ Fulfillment: frontend uses `/admin/fulfillments` endpoints for list, detail, and control (start-packing, complete-packing, ready-for-dispatch, dispatch, complete) — backend `FulfillmentController` implements these.
- ⚠ Packing slip reads: backend supports creating packing slips as part of `complete-packing` (mapper and repository exist), but there is no dedicated `GET /admin/fulfillments/:id/packing-slip` endpoint to read a packing slip. Frontend `usePackingSlip` hook is unimplemented.
- ⚠ Dispatch history reads: backend supports creating dispatch records (`PATCH /admin/fulfillments/:id/dispatch`) and persists `dispatch_records`, but there is no dedicated `GET /admin/fulfillments/:id/dispatch-records` endpoint to list dispatch history. Frontend `useDispatches` hook is unimplemented.

Endpoint-level Findings
-----------------------
Products
- Frontend: `GET /products` → maps product fields (`id`, `name`, `type`, `price`, `status`).
- Backend: `CatalogController` (`/products`) exists and returns products. OK.

Orders
- Frontend: `GET /orders` (admin list expected). `getAdminOrders()` maps order fields (orderNumber/id, customer.name, total, paymentStatus, fulfillmentStatus, status).
- Backend: `OrderController` (`/orders`) is customer-scoped; `listOrders()` returns orders for the current customer (uses test/dummy data). No admin listing endpoint.
- Risk: admin orders view calling customer-scoped endpoint; recommend adding `GET /admin/orders` or updating frontend to call `/admin/orders` if implemented.

Customers
- Frontend: `GET /admin/customers` — expects id, name, segment, lifetimeSpend/orderCount/status.
- Backend: `AdminCustomerController` exists and returns `CustomerProfilePresenter.toResponse(customer)`. Validate presenter shape against frontend mapping. Likely OK but verify `lifetimeSpend` vs `lifetimeSpend` naming.

Inventory
- Frontend: `GET /inventory`, `GET /inventory/:id`, `GET /inventory/variants/:productId/:variantId`, plus `POST /inventory/receive` and `POST /inventory/reserve`.
- Backend: `InventoryController` exposes `@Get()`, `@Get(':id')`, `@Get('variants/:productId/:variantId')`, `@Post('receive')`, `@Post('reserve')` — OK.
- DTOs: frontend expects `onHand` and `reserved` — `PrismaInventoryMapper` maps `on_hand` to `onHand` and `reserved` to `reserved`. OK.

Manufacturing
- Frontend: `GET /admin/manufacturing/jobs`, `GET /admin/manufacturing/jobs/:id`, `POST /admin/manufacturing/jobs`, and work-order patches.
- Backend: `ManufacturingController` provides these endpoints. OK.
- Timeline: no GET timeline endpoints present for manufacturing jobs or work-orders; frontend timeline hooks are placeholder. Recommend adding `GET /admin/manufacturing/jobs/:id/timeline` and `GET /admin/manufacturing/work-orders/:id/timeline` or a shared `GET /admin/timeline?entity=manufacturing&id=...`.

Fulfillment
- Frontend: `GET /admin/fulfillments`, `GET /admin/fulfillments/:id`, `PATCH` actions including start/complete packing, ready-for-dispatch, dispatch, complete. Also frontend has hooks for packing slip and dispatch history (unimplemented).
- Backend: `FulfillmentController` implements list, get, create, start-packing, complete-packing, ready-for-dispatch, dispatch, complete. Creating dispatch record and packing slip is supported at persistence layer.
- Missing read endpoints: no direct `GET` endpoint for a packing slip or dispatch records. Recommend adding:
  - `GET /admin/fulfillments/:id/packing-slip`
  - `GET /admin/fulfillments/:id/dispatch-records` (or `dispatch-records/:id` if needed).

Errors, pagination, enums, auth
- Pagination: frontend clients assume simple arrays (no pagination shape). Backend list endpoints return arrays; if pagination is introduced, update both sides. Recommend standardizing on `{ items: [], total, page, pageSize }` for list endpoints.
- Enums: check all status enums between frontend and backend. Examples found: `FulfillmentStatus` includes `READY_FOR_DISPATCH`, `DISPATCHED` etc. Frontend uses free-form strings (`status: string`). Recommend updating frontend to typed enums or constants.
- Validation errors: backend uses standard ApiError shapes; frontend `http()` parses error shape with `message`, `code`, `details`. Good — ensure validation errors follow that shape.
- Auth: Admin controllers use `@ApiTags('admin/...')` but only some controllers use `RolesGuard` (e.g., catalog). Ensure admin routes require appropriate roles; frontend admin pages must send auth tokens.

Recommendations & Next Steps
---------------------------
1. Add missing admin endpoints or adjust frontend calls:
   - Add `GET /admin/orders` for admin listing (or update frontend to call admin-specific endpoint).
   - Add `GET /admin/fulfillments/:id/packing-slip` and `GET /admin/fulfillments/:id/dispatch-records` to support `usePackingSlip` and `useDispatches` frontend hooks.
   - Add timeline read endpoints or a shared timeline API for orders, manufacturing, and fulfillment.
2. Standardize pagination on list endpoints (optional but recommended): use `{ items, total, page, pageSize }`.
3. Emit or document enum values for statuses in a shared `types` package (frontend packages can import shared enums from `packages/types` if feasible).
4. Implement frontend hooks only after endpoints are confirmed: `useInventoryMovements`, `usePackingSlip`, `useDispatches`, `useWorkOrders`, `useQualityInspections`.
5. Run automated contract checks (script):
   - For each `apps/web/src/.../api/*.ts`, parse exported route strings and DTO shapes (best-effort), then compare with backend controller method routes and mapper fields.

Appendix: Files inspected
- Frontend API clients:
  - `apps/web/src/features/admin/inventory/api/inventory.ts`
  - `apps/web/src/features/admin/manufacturing/api/manufacturing.ts`
  - `apps/web/src/features/admin/fulfillment/api/fulfillment.ts`
  - `apps/web/src/features/admin/api/products.ts`
  - `apps/web/src/features/admin/api/orders.ts`
  - `apps/web/src/features/admin/api/customers.ts`

- Backend controllers / mappers:
  - `apps/api/src/modules/inventory/presentation/controllers/inventory.controller.ts`
  - `apps/api/src/modules/manufacturing/presentation/manufacturing.controller.ts`
  - `apps/api/src/modules/fulfillment/presentation/fulfillment.controller.ts`
  - `apps/api/src/modules/fulfillment/presentation/order-fulfillment.controller.ts`
  - `apps/api/src/modules/order/presentation/controllers/order.controller.ts`
  - `apps/api/src/modules/catalog/presentation/controllers/catalog.controller.ts`
  - `apps/api/src/modules/customer/presentation/controllers/admin-customer.controller.ts`
  - `apps/api/src/modules/inventory/infrastructure/persistence/prisma/inventory.mapper.ts`
  - `apps/api/src/modules/fulfillment/infrastructure/persistence/prisma/fulfillment.mapper.ts`


-- End of audit
