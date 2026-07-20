# Enterprise Customers Module Report (TASK-11)

**Role:** Senior Principal Frontend Engineer  
**Directory Location:** `src/features/customers/`  
**Route:** `/customers`  
**Status:** Completed & Successfully Verified  
**TypeScript Mode:** Strict (`strict: true`)  

---

## 📁 Files Created

| File Path | Description |
| :--- | :--- |
| `src/features/customers/types/customer.types.ts` | TypeScript types (`Customer`, `CustomerStatus`, `CustomerOrderHistoryItem`). |
| `src/features/customers/constants/customer.constants.ts` | Constants for Customer Statuses (`Active`, `VIP`, `Inactive`, `Churned`). |
| `src/features/customers/mock/customers.mock.ts` | Mock dataset containing **100 detailed enterprise customer accounts**. |
| `src/features/customers/services/customerApi.ts` | RTK Query endpoints (`getCustomersList`, `getCustomerById`). |
| `src/features/customers/hooks/useCustomers.ts` | Custom React hook encapsulating customer queries. |
| `src/features/customers/components/CustomerStatusBadge.tsx` | Status badge component (`Active`, `VIP`, `Inactive`, `Churned`). |
| `src/features/customers/components/CustomerProfileCard.tsx` | Profile summary card component for account metadata and contact details. |
| `src/features/customers/components/CustomerOrderHistory.tsx` | Order history line item component displaying past order references, dates, totals, and statuses. |
| `src/features/customers/components/CustomerDrawer.tsx` | Slide-over drawer displaying profile card, financial metrics (Total Spent, Total Orders, Avg Order Value), and order history. |
| `src/features/customers/components/CustomerTable.tsx` | TanStack `DataTable` rendering customer avatars, emails, phones, order counts, spending, last purchase dates, status badges, and action triggers. |
| `src/features/customers/pages/CustomersPage.tsx` | Main feature page combining table, drawer, and header layout. |

---

## 🧩 Components Created

1. **CustomerTable**: TanStack DataTable instance with column sorting, spending formatters, and status badges.
2. **CustomerDrawer**: Detail drawer for inspecting account profile metadata, total spending, order counts, average order value, and order history.
3. **CustomerProfileCard**: Avatar, name, email, phone, shipping address, and member-since date display card.
4. **CustomerOrderHistory**: Table feed displaying customer's historical orders and completion statuses.
5. **CustomerStatusBadge**: Visual status badge mapping customer status to color tokens (`Active` -> Green, `VIP` -> Blue, `Inactive` -> Gray, `Churned` -> Red).

---

## 🛣️ Routes Added

- **`/customers`**: Configured in `src/router/index.tsx` mapping to `CustomersPage` within `ProtectedRouteWrapper` & `MainLayout`.
- **Sidebar**: Accessible directly via the primary navigation bar item.

---

## ✅ Validation & Build Status

- **TypeScript Typecheck (`tsc -b`)**: 0 Errors.
- **Vite Production Build (`vite build`)**: Built in 2.96s (`dist/index.html`, `dist/assets/`).
- **Dev Server (`npm run dev`)**: Verified running.
