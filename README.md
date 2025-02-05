# CareerBoardServiceFrontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.7.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


## Project structure

The project follows a standard Angular application structure:

- `/src` - Main application source code
  - `/app` - Core application components and modules
  - `/environments` - Environment-specific configuration files
  - `main.ts` - Application entry point
  - `styles.scss` - Global styles
  - `index.html` - Main HTML template

- `/public` - Static assets and resources
- `/node_modules` - Project dependencies
- Configuration Files:
  - `package.json` - Project metadata and dependencies
  - `tsconfig.json` - TypeScript configuration
  - `angular.json` - Angular workspace configuration
  - `.editorconfig` - Editor settings
  - `Dockerfile` - Container configuration

```

src/
├── app/
│   ├── core/                // Global services and single-instance modules
│   │   ├── guards/          // Route guards (e.g., AuthGuard, RoleGuard)
│   │   ├── interceptors/    // HTTP interceptors (e.g., JWT, Error Handling)
│   │   ├── services/        // Global services (e.g., AuthService, APIService)
│   │   ├── models/          // Interfaces and types used globally
|   |   |── Layouts          // Layout components for different user roles
│   │   └── core.module.ts   // CoreModule definition
│   ├── shared/              // Reusable components, directives, and pipes
│   │   ├── components/      // Shared UI components (e.g., modals, buttons)
│   │   ├── directives/      // Custom reusable directives
│   │   ├── pipes/           // Reusable pipes (e.g., date formatting)
│   │   └── shared.module.ts // SharedModule definition
│   ├── features/            // Feature-specific modules and components
│   │   ├── auth/            // Authentication module
│   │   ├── posts/           // Post management module
│   │   ├── users/           // User management module
│   │   └── admin/           // Admin-specific module
│   ├── layouts/             // Layout components for different user roles
│   │   ├── admin-layout/    // Admin layout (e.g., sidebar, header)
│   │   └── user-layout/     // User layout
│   ├── app-routing.module.ts  // Main routing configuration
│   └── app.module.ts        // Root application module 
├── assets/                  // Static assets (images, icons, etc.)
├── environments/            // Environment-specific configurations
└── styles/                  // Global styles and CSS variables
```

### Zoom view of the `features/posts` module
```

src/app/features/
└── posts/
    ├── components/
    │   ├── post-list/
    │   ├── post-detail/
    │   ├── post-create/
    │   └── post-edit/
    ├── services/
    │   └── post.service.ts
    ├── models/
    │   └── post.model.ts      // Model definition for Post
    ├── posts-routing.module.ts
    └── posts.module.ts
```
