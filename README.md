# Post Manager - Angular Technical Test

A modern Angular application that consumes the JSONPlaceholder API for post management. This project demonstrates CRUD operations, reactive forms, TypeScript interfaces, and best practices for Angular development.

## 🚀 Features

- **Post Management**: Full CRUD operations (Create, Read, Update, Delete)
- **Post List**: Display up to 10 posts with pagination-ready structure
- **Post Detail**: View complete post information with author details
- **Create/Edit Posts**: Reactive forms with comprehensive validation
- **Delete Confirmation**: User-friendly confirmation dialogs
- **Responsive Design**: Mobile-first responsive layout
- **Loading States**: Global loading spinner with HTTP interceptor
- **Toast Notifications**: Success/error message system
- **TypeScript**: Strict typing throughout the application
- **Lazy Loading**: Route-based code splitting for optimal performance

## 🛠 Tech Stack

- **Angular 20.3.3** - Latest Angular framework
- **TypeScript** - Strict typing and modern JavaScript features
- **RxJS** - Reactive programming for HTTP operations
- **Angular Router** - Lazy loading and route management
- **Reactive Forms** - Form validation and management
- **HTTP Client** - API communication with interceptors
- **Server-Side Rendering (SSR)** - Enhanced performance and SEO

## 📋 Requirements Implemented

### ✅ Functional Requirements

- [x] **Post List**: Table/card view of posts with title, author, and content
- [x] **Post Limit**: Maximum 10 posts displayed
- [x] **Action Buttons**: View, Edit, Delete buttons for each post
- [x] **Post Detail**: Complete post view with author information
- [x] **Create Post**: Form with userId, title, body fields
- [x] **Edit Post**: Pre-populated form for existing posts
- [x] **Delete Post**: Confirmation dialog before deletion
- [x] **Form Validation**: Required fields and minimum length validation

### ✅ Technical Requirements

- [x] **Angular 14+**: Using Angular 20.3.3
- [x] **Services**: API service for HTTP operations
- [x] **Reactive Forms**: FormGroup and FormControl implementation
- [x] **Component Architecture**: Reusable and separated components
- [x] **TypeScript Interfaces**: Strict typing for API responses
- [x] **HTTP Methods**: GET, POST, PUT, DELETE operations

### ✅ Bonus Features

- [x] **Loading Spinner**: Global loading state management
- [x] **Toast Notifications**: Success/error message system
- [x] **HTTP Interceptor**: Automatic loading state handling
- [x] **Lazy Loading**: Route-based code splitting
- [x] **Modern Architecture**: Standalone components and latest Angular patterns

## 🏗 Project Structure

```
src/
├── app/
│   ├── components/           # Feature components
│   │   ├── post-list/       # Main posts listing
│   │   ├── post-detail/     # Individual post view
│   │   ├── post-form/       # Create/edit form
│   │   ├── notifications/   # Toast messages
│   │   └── loading-spinner/ # Loading indicator
│   ├── services/            # Business logic
│   │   ├── api.service.ts   # JSONPlaceholder API
│   │   ├── loading.service.ts
│   │   └── notification.service.ts
│   ├── interfaces/          # TypeScript definitions
│   │   └── api.interface.ts # API response types
│   ├── interceptors/        # HTTP interceptors
│   │   └── loading.interceptor.ts
│   ├── app.routes.ts        # Route configuration
│   └── app.config.ts        # App configuration
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Angular CLI (`npm install -g @angular/cli`)

### Installation & Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm start
   # or
   ng serve
   ```

```

3. **Open in browser**
```

http://localhost:4200

```

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run unit tests
- `npm run lint` - Run linting
- `npm run e2e` - Run end-to-end tests

## 🔧 Development

### VS Code Setup
The project includes VS Code configuration for optimal development:
- **Launch Configuration**: Debug setup
- **Tasks**: Build and serve tasks
- **Extensions**: Recommended extensions list

### Code Quality
- **TypeScript Strict Mode**: Enabled for type safety
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting (if configured)

## 🌐 API Integration

The application integrates with [JSONPlaceholder API](https://jsonplaceholder.typicode.com/):

### Endpoints Used
- `GET /posts` - Fetch all posts (limited to 10)
- `GET /posts/:id` - Fetch single post
- `GET /users` - Fetch all users
- `GET /users/:id` - Fetch single user
- `POST /posts` - Create new post
- `PUT /posts/:id` - Update existing post
- `DELETE /posts/:id` - Delete post

### Response Types
All API responses are strongly typed using TypeScript interfaces:
- `Post` - Post structure
- `User` - User structure with nested Address and Company
- `CreatePostRequest` - New post payload
- `UpdatePostRequest` - Update post payload

## 🎨 UI/UX Features

### Design System
- **Color Palette**: Professional blue and gray tones
- **Typography**: Inter font family for modern appearance
- **Spacing**: Consistent 8px grid system
- **Components**: Reusable button and form styles

### Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: Responsive grid and navigation
- **Touch Friendly**: Adequate button sizes and spacing

### User Experience
- **Loading States**: Clear feedback during API operations
- **Error Handling**: User-friendly error messages
- **Form Validation**: Real-time validation feedback
- **Confirmation Dialogs**: Prevent accidental deletions

## 🔄 Git Workflow

### Branch Strategy
- `main` - Production-ready code
- `develop` - Development integration
- `feature/*` - Feature development
- `hotfix/*` - Production fixes

### Commit Convention
Follow conventional commits for clear history:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation updates
- `style:` - Code formatting
- `refactor:` - Code restructuring
- `test:` - Test additions/updates

## 📈 Performance Optimizations

- **Lazy Loading**: Route-based code splitting
- **OnPush Strategy**: Change detection optimization
- **TrackBy Functions**: Efficient list rendering
- **HTTP Caching**: Optimized API requests
- **Bundle Optimization**: Tree-shaking and minification

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is created for technical assessment purposes.

## 🙋‍♂️ Support

For questions or support, please create an issue in the repository.

---

**Note**: This application is built for demonstration purposes using the free JSONPlaceholder API. Some operations (like POST, PUT, DELETE) are simulated and don't persist on the server.
```
