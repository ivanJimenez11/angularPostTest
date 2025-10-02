# Post Manager - Angular Technical Test

## Project Overview

This workspace contains a complete Angular application for managing posts using the JSONPlaceholder API. The project demonstrates modern Angular development practices including:

- Angular 20.3.3 with standalone components
- TypeScript strict mode with comprehensive interfaces
- Reactive forms with validation
- HTTP client with interceptors
- Lazy loading and route-based code splitting
- Responsive design with mobile-first approach
- Toast notifications and loading states

## Development Guidelines

### Architecture

- **Components**: Feature-based organization in `src/app/components/`
- **Services**: Business logic in `src/app/services/`
- **Interfaces**: TypeScript definitions in `src/app/interfaces/`
- **Interceptors**: HTTP middleware in `src/app/interceptors/`

### Code Standards

- Use TypeScript strict mode throughout
- Implement proper error handling with user-friendly messages
- Follow reactive programming patterns with RxJS
- Maintain consistent naming conventions
- Use Angular's built-in form validation

### API Integration

The project consumes JSONPlaceholder API endpoints:

- GET /posts - List posts (limited to 10)
- GET /posts/:id - Single post details
- GET /users - User information
- POST /posts - Create post (simulated)
- PUT /posts/:id - Update post (simulated)
- DELETE /posts/:id - Delete post (simulated)

### Development Workflow

1. Start development server: `ng serve`
2. Access application: http://localhost:4200
3. Build for production: `ng build`
4. Run tests: `ng test`

### Features Implemented

- ✅ Post listing with author information
- ✅ Post detail view with complete user data
- ✅ Create/edit post forms with validation
- ✅ Delete confirmation dialogs
- ✅ Loading states and error handling
- ✅ Toast notification system
- ✅ Responsive design
- ✅ TypeScript interfaces for all API responses
- ✅ HTTP interceptor for loading states
- ✅ Lazy loading for optimal performance

This project serves as a comprehensive example of modern Angular development practices and can be used as a reference for similar applications.
