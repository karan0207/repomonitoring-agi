# DevOps-AGI

DevOps-AGI is an autonomous DevOps system that connects to a GitHub repository, continuously monitors repository health, automatically fixes well-scoped issues using a CLI-based AI agent, and improves its decision-making over time using reinforcement learning.

## Project Structure

- `backend/`: Node.js/Express API service.
- `dashboard/`: Next.js 14 frontend.
- `database/`: Prisma schema and migrations.
- `kestra_flows/`: Kestra workflow definitions.
- `docker-compose.yml`: Infrastructure orchestration.

## Getting Started

### Prerequisites

- Docker & Docker Compose
- Node.js (v18+)

### Running the Infrastructure

Start the Postgres database, Kestra orchestrator, and Backend API:

```bash
docker-compose up -d
```

### Running the Frontend

The dashboard is designed to run locally for development:

```bash
cd dashboard
npm install
npm run dev
```

Visit `http://localhost:3000` to see the dashboard.

### Accessing Services

- **Backend API**: `http://localhost:3001`
- **Kestra UI**: `http://localhost:8080`
- **Database**: `localhost:5432` (User: `user`, Pass: `password`, DB: `devops_agi`)

## Development

1. **Backend**:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Database**:
   To push schema changes:
   ```bash
   cd backend
   npm run prisma:generate
   ```


