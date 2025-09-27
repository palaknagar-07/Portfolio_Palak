git # Ocean-Themed Portfolio Website

## Overview

This is an ocean-themed portfolio website for Palak Nagar, a Computer Science Engineering 3rd year student specializing in AI/ML. The project is built as a full-stack application with a React frontend featuring stunning ocean-themed visuals, animations, and interactive elements. The website showcases skills, projects, and experience through immersive underwater metaphors like jellyfish skill cards, coral reef project displays, and animated fish schools.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Styling**: Tailwind CSS with custom ocean-themed color palettes and animations
- **UI Components**: Radix UI component library through shadcn/ui for accessible, customizable components
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management and caching
- **Animations**: Custom CSS animations for ocean effects like bubbles, waves, and floating elements

### Component Structure
- **Ocean Hero Section**: Full-screen landing with animated background and rotating professional titles
- **Skills Jellyfish**: Interactive skill cards with jellyfish-themed animations and progress indicators
- **Projects Reef**: Grid-based project showcase with coral reef aesthetics
- **About Deep Sea**: Personal information section with ocean depth theming
- **Contact Ocean Floor**: Contact form with underwater styling
- **Navigation**: Responsive navigation with scroll-based background transitions

### Backend Architecture
- **Server**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Development Setup**: Hot reloading with Vite middleware integration
- **API Structure**: RESTful endpoints under `/api` prefix
- **Error Handling**: Centralized error middleware with proper HTTP status codes

### Database Design
- **Schema**: Basic user management with PostgreSQL
- **Tables**: Users table with id, username, and password fields
- **ORM Features**: Type-safe database operations with Drizzle
- **Migrations**: Automated database schema management

### Styling System
- **Design Tokens**: Custom CSS variables for ocean-themed colors (deep blues, cyans, teals)
- **Dark Mode**: Primary theme with optional light mode support
- **Typography**: Inter font for body text, Orbitron for headings and branding
- **Layout**: Responsive grid system with consistent spacing using Tailwind utilities
- **Animations**: Custom keyframe animations for ocean effects (bubbles, fish schools, floating elements)

### Data Management
- **Static Data**: Skills and projects stored in TypeScript data files
- **Personal Information**: Centralized configuration for easy updates
- **Image Assets**: Organized asset management with path aliases
- **Form Handling**: React Hook Form with validation for contact forms

## External Dependencies

### Core Technologies
- **@neondatabase/serverless**: Neon PostgreSQL serverless database connection
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight React router

### UI and Styling
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **clsx**: Conditional CSS class utilities

### Development Tools
- **vite**: Fast build tool and development server
- **typescript**: Type safety and developer experience
- **esbuild**: Fast JavaScript bundler for production builds
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay

### Form and Validation
- **react-hook-form**: Performant form library
- **@hookform/resolvers**: Form validation resolvers
- **zod**: Runtime type validation (via drizzle-zod)

### Additional Features
- **lucide-react**: Icon library for consistent iconography
- **date-fns**: Date manipulation utilities
- **embla-carousel-react**: Carousel component for project showcases
- **cmdk**: Command palette component for enhanced navigation