# Enterprise SaaS Dashboard

A production-ready, high-performance Enterprise SaaS Dashboard built with **React 19**, **TypeScript**, **Vite**, **Redux Toolkit**, **RTK Query**, and **Tailwind CSS v4**.

Designed following **Feature-Based Clean Modular Architecture** to support enterprise scalability, role-based authorization (RBAC), theme customization, and modular code isolation.

---

## 🛠️ Tech Stack & Dependencies

### Core Framework & Tooling
- **Framework:** React 19 (`react`, `react-dom`)
- **Language:** TypeScript 5.7 (Strict Mode)
- **Build Tool:** Vite 6.1 with `@/*` path alias resolution
- **Routing:** React Router v7 (`react-router-dom`)

### State Management & Data Fetching
- **Global Store:** Redux Toolkit (`@reduxjs/toolkit`, `react-redux`, `redux-persist`)
- **Data Engine & API:** RTK Query + Axios client (`axios`)

### Styling & UI Design System
- **CSS Framework:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Design Tokens:** Dark/Light theme switching (`next-themes`), Glassmorphism, Custom scrollbars
- **UI Primitives:** `shadcn/ui` style utilities (`clsx`, `tailwind-merge`, `class-variance-authority`)
- **Icons:** Lucide React (`lucide-react`)
- **Notifications:** Sonner Toast Notifications (`sonner`)

### Data Visualization & Utilities
- **Charts:** Recharts (`recharts`)
- **Tables:** TanStack Table (`@tanstack/react-table`)
- **Form Handling & Validation:** React Hook Form (`react-hook-form`), `@hookform/resolvers`, Zod (`zod`)
- **Dates:** `date-fns`

### DevOps & Testing
- **Unit & Component Testing:** Vitest (`vitest`), Testing Library (`@testing-library/react`)
- **Containerization:** Multi-stage `Dockerfile` & `docker-compose.yml`
- **CI/CD:** GitHub Actions CI workflow (`.github/workflows/ci.yml`)

---

## 📁 Scalable Directory Architecture (`src/`)

```
src/
├── app/                  # Application root, providers & entry points
│   ├── App.tsx
│   ├── main.tsx
│   └── providers.tsx
├── assets/               # Static assets (images, icons, fonts)
├── components/           # Reusable UI components & layouts
│   ├── common/           # ErrorBoundary, StatCard, LoadingState, ProtectedRoute
│   ├── layout/           # Header, Sidebar, PageHeader, Footer
│   ├── ui/               # Button, Input, Card, Badge, Modal, Select
│   ├── forms/, tables/, charts/, feedback/, navigation/
├── config/               # API, Environment, and Theme configurations
├── constants/            # Route constants, Role definitions, Permissions matrix, Messages
├── features/             # Feature Modules (Pages, Components, Services, Types)
│   ├── auth/             # Login, Register, Forgot Password
│   ├── dashboard/        # Executive Overview, KPI cards, Sales charts
│   ├── analytics/        # Financial analytics, acquisition traffic breakdown
│   ├── users/            # User directory, role filter, status toggle, Add User modal
│   ├── roles/            # Security permission matrix editor
│   ├── products/         # Product suite, license catalog, price formatters
│   ├── orders/           # Order fulfillment, wire transfer status, drawer details
│   ├── customers/        # Enterprise customer accounts & Lifetime Value (LTV)
│   ├── notifications/    # Interactive alert feed & notification management
│   ├── profile/          # User profile edit & 2FA hardware security
│   ├── settings/         # Secret API key generator, webhooks, billing plans
│   ├── reports/          # Custom report generator (CSV, JSON, PDF export)
│   └── audit-logs/       # Security event trail & IP origin tracking
├── hooks/                # Custom React hooks (useAuth, useDarkMode, usePermission, useDebounce, usePagination, useLocalStorage)
├── layouts/              # Top-level layout wrappers (AuthLayout, DashboardLayout)
├── lib/                  # Library utilities (axios client, storage wrapper, cn helper)
├── providers/            # Redux & Theme providers
├── router/               # React Router configuration & Protected Route wrapper
├── services/             # RTK Query base API & enterprise mock backend engine
├── store/                # Redux Toolkit store & root reducer setup
├── styles/               # Global CSS & theme variables (globals.css, variables.css)
├── types/                # TypeScript interfaces (auth, user, product, order, analytics, audit, api)
└── utils/                # Date, currency, and string helper functions
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js `>= 20`
- npm `>= 10`

### Installation & Local Run

```bash
# 1. Clone repository
git clone https://github.com/RahulJaggi/enterprise-saas-dashboard.git
cd enterprise-saas-dashboard

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the dashboard locally.

---

## 📜 Available Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev` | Starts Vite dev server on port 3000 |
| `npm run build` | Runs TypeScript typecheck (`tsc -b`) and builds production bundle |
| `npm run preview` | Serves production build locally |
| `npm run lint` | Runs ESLint analysis |
| `npm run format` | Formats code with Prettier |
| `npm run test` | Runs Vitest unit tests |
| `npm run coverage` | Generates test coverage report |

---

## 🐳 Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up --build
```
Access the application at `http://localhost:8080`.

---

## 📄 Documentation Reports

- **Implementation Plan:** [implementation_plan.md](file:///Users/rahuljaggi/.gemini/antigravity/brain/cc34fdc5-a8eb-4de1-95fa-d69b0fda1b35/implementation_plan.md)
- **Completed Walkthrough:** [walkthrough.md](file:///Users/rahuljaggi/.gemini/antigravity/brain/cc34fdc5-a8eb-4de1-95fa-d69b0fda1b35/walkthrough.md)
- **Task-02 Foundation Report:** [IMPLEMENTATION_REPORT.md](file:///Users/rahuljaggi/Documents/GithubProjects/enterprise-saas-dashboard/IMPLEMENTATION_REPORT.md)
