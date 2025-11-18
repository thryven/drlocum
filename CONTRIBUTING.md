# Contributing to Doses

Thank you for your interest in contributing to Doses! This document outlines the guidelines and best practices to follow when contributing to the project.

## Getting Started

To get started, you'll need to have Node.js (version 20 or higher) and `npm` installed on your machine.

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Mango2Juice/doseright.git
    cd doseright
    ```

2. **Install dependencies:**

    This project uses `npm` for package management. To install dependencies, run:

    ```bash
    npm install
    ```

3. **Run the development server:**

    To start the Next.js development server, run:

    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:9002`.

## Development Workflow

### Branching

Create a new branch for each feature or bug fix you're working on. Use a descriptive name, such as `feature/add-new-calculator` or `fix/dosage-calculation-error`.

### Code Quality & Formatting

This project uses **Biome** for linting and formatting. Before committing your changes, please run the following commands:

- **Format code:**

    ```bash
    npm format
    ```

- **Lint code:**

    ```bash
    npm lint
    ```

- **Check for both formatting and linting errors:**

    ```bash
    npm check
    ```

### Type Checking

Ensure your code is type-safe by running the TypeScript compiler:

```bash
npm typecheck
```

## Testing

We use **Vitest** for unit and integration testing. All new features and bug fixes should include tests to ensure the application remains stable and reliable.

- **Run all tests:**

    ```bash
    npm test
    ```

- **Run tests in watch mode:**

    ```bash
    npm test:watch
    ```

- **Generate a coverage report:**

    ```bash
    npm test:coverage
    ```

## Submitting Changes

1. **Preflight Check**: Before submitting your changes, run the full preflight check to ensure all quality gates are met:

    ```bash
    npm preflight
    ```

    This command runs formatting, linting, building, and testing in one step.

2. **Create a Pull Request**: Push your branch to GitHub and create a pull request to the `master` branch. Provide a clear title and description of the changes you've made.

## Code of Conduct

Please note that this project is released with a Contributor Code of Conduct. By participating in this project, you agree to abide by its terms. We are committed to fostering an open and welcoming environment.
