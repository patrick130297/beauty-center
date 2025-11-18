# Multi-tenant Booking System for Beauty Centers

MVP booking system developed in Next.js for beauty centers, allowing each center to have its own landing page where clients can view available services and schedule appointments.

## 🌐 Live Demo

**Production URL**: [https://arionkoder.vercel.app/](https://arionkoder.vercel.app/)

Visit the live application to see it in action!

## 🚀 Features

- **Dynamic Pages per Center**: Each center has its own route (`/[center]`)
- **Service Listing**: Display of services with name, duration, price, and description
- **Booking Form**: Complete booking system with advanced validation using React Hook Form and Zod
- **Booking Confirmation**: Confirmation page with booking details
- **Server Components**: Server-side rendering for optimal performance and SEO
- **Automatic Loading States**: Next.js `loading.tsx` files for instant loading UI
- **Error Boundaries**: Native Next.js error handling with recovery functionality
- **Dynamic Metadata**: SEO-optimized metadata per center with Open Graph and Twitter cards
- **404 Handling**: Native `notFound()` and `not-found.tsx` for proper 404 pages
- **Intelligent Caching**: Route segment config with automatic revalidation (15 minutes)
- **Internationalization (i18n)**: Multi-language support (Portuguese and English)
- **Business Hours Validation**: Time selection restricted to 9 AM - 6 PM with 30-minute intervals
- **Date Validation**: Advanced date validation using date-fns library
- **Reusable Components**: Modular button and form components for consistent UI
- **Data Persistence**: Local storage using LocalStorage
- **Responsive Design**: Modern and professional interface using TailwindCSS

## 📋 Requirements

- Node.js 18+ 
- pnpm (or npm/yarn)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd arionkoder
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── [center]/            # Dynamic center routes
│   │   ├── components/      # Page-specific components
│   │   ├── confirm/         # Booking confirmation page
│   │   ├── page.tsx         # Server Component (center landing)
│   │   ├── loading.tsx      # Automatic loading UI
│   │   ├── error.tsx        # Error boundary
│   │   └── not-found.tsx    # 404 page
│   ├── api/                 # API routes
│   │   └── centers/[center]/ # Center data endpoint
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # Reusable UI components (buttons, forms, cards, etc.)
├── lib/                     # Server-side utilities
│   └── centers.ts           # Center data fetching with cache
├── i18n/                    # Internationalization
│   ├── I18nProvider.tsx    # i18n provider
│   └── locales/            # Translation files (pt, en)
├── types/                   # TypeScript definitions
└── constants/               # Application constants
```

## 🎯 Available Routes

### Pages
- `/` - Home page with list of centers
- `/[center]` - Center landing page (Server Component with dynamic metadata)
- `/[center]/confirm` - Booking confirmation page

### Special Files
- `loading.tsx` - Automatic loading UI during route navigation
- `error.tsx` - Error boundary with recovery functionality
- `not-found.tsx` - Custom 404 page

### API Routes
- `/api/centers/[center]` - GET endpoint to fetch center data by slug

## 🏗️ Technical Decisions

### Architecture

- **Next.js App Router**: Used for routing and rendering
- **Server Components**: Server-side rendering for optimal performance and SEO
- **TypeScript**: Strong typing for type safety
- **Functional Components**: All components are functional with hooks
- **Component Organization**: Components organized in folders with `index.tsx` following a consistent pattern
- **Reusable UI Components**: Modular button and form components for consistent design system
- **Separation of Concerns**: UI components, business logic, and validation schemas are separated
- **Route Segment Config**: Cache and revalidation configuration at route level (15 min)

### State Management

- **React Hooks**: `useState` and `useEffect` for local state management
- **React Hook Form**: Form state management and validation integration
- **LocalStorage**: Persistence of bookings in the browser
- **URL State**: Route parameters for navigation and sharing

### API & Data Fetching

- **Centralized Mock Data**: `src/lib/centers.ts` exports all centers/services and is imported everywhere (server components + API)
- **Next.js API Routes**: `/api/centers/[center]` reuses the same helpers and simulates a 1.5s delay to mimic real calls
- **React `cache()`**: Deduplicates `getCenter` calls inside the same render cycle
- **Route Segment Revalidation**: `revalidate = 900` keeps center pages fresh without rebuilding the whole app

### Validation

- **React Hook Form**: Form state management with built-in validation
- **Zod**: Schema-based validation with type-safe error messages
- **Date & Date/Time Validation**: `date-fns` ensures the date is today or future, and combined date+time can’t be in the past
- **Business Hours Validation**: Time selection restricted to 9 AM - 6 PM with 30-minute intervals
- **Email Validation**: Custom regex refine keeps email validation independent of deprecated APIs
- **Real-time Validation**: Validation feedback provided as user types

### SEO & Metadata

- **Dynamic Metadata**: `generateMetadata()` function for SEO-optimized metadata per center
- **Open Graph Tags**: Social media sharing optimization
- **Twitter Cards**: Twitter sharing optimization

### Internationalization

- **react-i18next**: React integration for i18next
- **Language Detection**: Automatic language detection from browser settings
- **Supported Languages**: Portuguese (pt) and English (en)
- **Language Selector**: UI component for manual language switching
- **Localized Content**: All user-facing text is translated and stored in JSON files

### Styling

- **TailwindCSS**: Utility-first CSS framework for fast and consistent styling
- **Responsive Design**: Layout adaptable to different screen sizes
- **Accessibility**: Focus on semantic elements and focus states
- **Component Styles**: Styles separated from component logic
- **Design System**: Reusable button and form components with consistent styling and behavior

## 🧪 How to Use

1. **Access a Center**:
   - On the home page, click on one of the available centers
   - Or access directly `/center1` or `/center2`

2. **View Services**:
   - On the center page, you will see all available services
   - Each service shows name, duration, price, and description

3. **Book a Service**:
   - Click the "Book" button on the desired service
   - Fill out the form with your information (name and email)
   - Select a date (today or future dates are allowed)
   - Select a time from the dropdown (9 AM - 6 PM, 30-minute intervals)
   - Click "Confirm Booking"

4. **Confirm Booking**:
   - After booking, you will be redirected to the confirmation page
   - The page displays all booking details

## 📝 Assumptions

- Center data is mocked and stored in the Next.js API route
- Bookings are persisted only in the browser's LocalStorage
- Time slots are restricted to business hours (9 AM - 6 PM) with 30-minute intervals
- There is no real-time availability check for time slots
- There is no user authentication
- Each center has its own services defined statically

## ⚡ Performance Optimizations

- **Server Components**: Reduced JavaScript bundle size with server-side rendering
- **Intelligent Caching**: Automatic cache revalidation every 15 minutes
- **Request Deduplication**: React `cache()` prevents duplicate requests in the same render

## 🔮 Unimplemented Features

- User authentication system
- Real-time availability check for time slots (currently only validates business hours)
- Real API integration with database
- Email notification system
- Administrative panel to manage centers and services
- Client booking history
- Booking cancellation
- Rating and review system
- Additional languages support

## 🛠️ Technologies Used

### Core Framework
- **Next.js 16.0.3**: React framework for production with App Router
- **React 19.2.0**: JavaScript library for interfaces
- **TypeScript 5**: JavaScript superset with static typing

### Form & Validation
- **React Hook Form 7.66.1**: Performant form library with minimal re-renders
- **Zod 4.1.12**: TypeScript-first schema validation
- **@hookform/resolvers 5.2.2**: Resolver for integrating Zod with React Hook Form

### UI Components
- **Reusable Button Components**: Modular button system with primary, secondary, and link variants
- **Form Components**: Reusable form field, input, and select components with consistent styling

### Date Manipulation
- **date-fns 4.1.0**: Modern JavaScript date utility library

### Internationalization
- **i18next 25.6.2**: Internationalization framework
- **react-i18next 16.3.3**: React integration for i18next
- **i18next-browser-languagedetector 8.2.0**: Browser language detection

### Styling
- **TailwindCSS 4**: Utility-first CSS framework

### Utilities
- **LocalStorage API**: Data persistence in the browser

## 📦 Available Scripts

- `pnpm dev` - Starts the development server
- `pnpm build` - Creates production build
- `pnpm start` - Starts the production server
- `pnpm lint` - Runs the linter

## ⏱️ Development Time

Total time invested in this project: **1 hour and 35 minutes** (95 minutes)

Breakdown by phase:
- **10 minutes**: Creating the initial prompt
- **5 minutes**: Waiting for code generation
- **40 minutes**: Code review
- **20 minutes**: Making adjustments and refinements
- **10 minutes**: Deployment setup
- **10 minutes**: Writing documentation (README)

## 🤖 AI Usage

This project was developed using **Cursor**, an AI-powered code editor that accelerates development through intelligent code generation and assistance.

### AI Tools Used
- **Cursor AI**
- **next-devtools MCP**
- **Sequential Thinking MCP**

---

Developed following Clean Code principles, functional components, and React/Next.js best practices.
