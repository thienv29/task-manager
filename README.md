# task-manager

This is a task management application built with Next.js, React, and various UI components from Radix UI.

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (Recommended: Latest LTS version)
- npm (Comes with Node.js)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/thienv29/task-manager.git
    cd task-manager
    ```

2. Install dependencies:
    ```sh
    npm install --legacy-peer-deps
    ```

### Prisma Workflow Guide

1. Install Dependencies

```sh
npm install @prisma/client prisma mysql2
```

2. Initialize Prisma

```sh
npx prisma init
```

3. Configure Database Connection
   Edit `.env`:

```env
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
```

4. Define Models in `schema.prisma`
   Example:

```prisma
model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
  age   Int?
}
```

5. Run Migrations

```sh
npx prisma migrate dev --name init
```

For production:

```sh
npx prisma migrate deploy
```

6. Generate Prisma Client

```sh
npx prisma generate
```

7. Use Prisma in Code
   Create a Prisma client instance in `lib/prisma.js`:

```js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default prisma;
```

8. Create API to Fetch Data in Next.js
   Create an API route in `pages/api/tasks.ts`:

```js
import prisma from "../../lib/prisma";

export async function GET() {
  try {
    // Lấy tất cả tasks từ database
    const tasks = await prisma.task.findMany();
    
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
```

9. Deploy Prisma Migrations

```sh
npx prisma migrate deploy
```

### Installing Zustand

To install Zustand for state management, run:

```sh
npm install zustand --legacy-peer-deps
```

### Running the Development Server

To start the development server, run:

```sh
npm run dev
```

The application will be available at [http://localhost:3200](http://localhost:3200).

### Running the JSON Server

To start the JSON server for the mock database, run:

```sh
npm run db:start
```

The JSON server will be available at [http://localhost:3000](http://localhost:3000).

### Building for Production

To build the application for production, run:

```sh
npm run build
```

To start the production server, run:

```sh
npm run start
```

### Linting

To lint the code, run:

```sh
npm run lint
```

## License

This project is licensed under the [MIT License](LICENSE).

