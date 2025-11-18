# Doses: Medication Dosage Calculator

**Doses** is a Progressive Web Application (PWA) designed to assist healthcare professionals in accurately calculating medication dosages for pediatric and adult patients. It provides a reliable, user-friendly tool based on established medical standards to enhance patient safety.

![Doses Screenshot](https://storage.googleapis.com/project-screenshots/doseright/doses-screenshot.png)

## Key Features

- **Quick Drug Reference**: An integrated dose calculator with a comprehensive quick-reference drug database.
- **Medical Calculators**: A suite of interactive clinical calculators, including pregnancy due date, neonate weight loss, STOP-BANG score, and more.
- **Clinical Resources**: A curated library of essential clinical reference guides and schedules.
- **Offline Capabilities**: As a PWA, the application is cached for offline use, ensuring functionality without an internet connection.
- **Safety-First Design**: Built with multiple layers of validation and warnings to prevent dosage errors.

For a full list of features, see the [Product Overview](PRODUCT.md).

## Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Testing**: [Vitest](https://vitest.dev/)
- **Code Quality**: [Biome.js](https://biomejs.dev/)

For more details on the architecture, see the [Architecture Overview](ARCHITECTURE.md).

## Getting Started

To get the project up and running on your local machine, follow these steps.

### Prerequisites

- Node.js (v20.x or later)
- npm (comes with Node.js)

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Mango2Juice/doseright.git
    cd doseright
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Run the development server:**

    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:9002`.

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Creates a production-ready build.
- `npm run start`: Starts the production server.
- `npm test`: Runs the test suite using Vitest.
- `npm run lint`: Lints the codebase using Biome.
- `npm run format`: Formats the code using Biome.
- `npm run typecheck`: Runs the TypeScript compiler to check for type errors.

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) to get started.

## License

This project is licensed under the MIT License.
