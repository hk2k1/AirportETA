# AirportETA

## Project Overview

AirportETA is a Next.js-based application designed to predict airport taxi and passenger waiting times. It includes a dashboard for managing taxi and passenger information.

### Key Features

- **Dashboard**: Customizable dashboard with the ability to enable/disable components via settings.
- **Taxi Maps**: Resizable and draggable Mapbox maps displaying taxi points, with fullscreen control and bounded drag functionality.
- **OAuth Authentication**: Supports authentication via GitHub and Google (Note: May not be fully functional in the current version).
- **Developer Tools**: Includes a `<Disable>` component wrapper for easy component toggling.

## Technologies Used

<table>
  <tr>
    <td align="center" width="96">
      <a href="https://nextjs.org/" target="_blank">
        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg" width="48" height="48" alt="Next.js" />
      </a>
      <br>Next.js
    </td>
    <td align="center" width="96">
      <a href="https://supabase.com/" target="_blank">
        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/supabase/supabase-original.svg" width="48" height="48" alt="Supabase" />
      </a>
      <br>Supabase
    </td>
    <td align="center" width="96">
      <a href="https://www.postgresql.org/" target="_blank">
        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" width="48" height="48" alt="PostgreSQL" />
      </a>
      <br>PostgreSQL
    </td>
    <td align="center" width="96">
      <a href="https://ui.shadcn.com/" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/139895814?s=200&v=4" width="48" height="48" alt="Shadcn UI" />
      </a>
      <br>Shadcn UI
    </td>
  </tr>
  <tr>
    <td align="center" width="96">
      <a href="https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions" target="_blank">
        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg" width="48" height="48" alt="Next.js Server Actions" />
      </a>
      <br>Server Actions
    </td>
    <td align="center" width="96">
      <a href="https://www.docker.com/" target="_blank">
        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg" width="48" height="48" alt="Docker" />
      </a>
      <br>Docker
    </td>
  </tr>
</table>

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Docker](https://www.docker.com/get-started/) - Download and install Docker for your operating system.
- [Visual Studio Code](https://code.visualstudio.com/) - Download and install VS Code.
- [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) for VS Code - Install this extension in VS Code.

### Environment Setup

1. Clone the repository:
   ```
   git clone https://github.com/your-repo/airporteta.git
   cd AirportETA/airport-eta
   ```

2. Open the project in Visual Studio Code.

3. When prompted, click `Reopen in Container` to start the dev container.

4. Copy the `.env.example` file to `.env` and fill in the necessary environment variables:
   ```
   cd airport-eta
   cp .env.example .env
   ```


### Running the Application

Once inside the dev container:

1. Navigate to the project directory:
   ```
   cd airport-eta
   ```

2. Install dependencies:
   ```
   yarn install
   ```
   or
   ```
   npm install
   ```

3. Start the development server:
   ```
   yarn dev
   ```
   or
   ```
   npm run dev
   ```

4. Open your browser and visit `http://localhost:3000` (or the port specified in your console output).

### Additional Commands

- Linting: `yarn lint`
- Clean build files: `yarn clean`
- Clear cache: `yarn clean:cache`
- Start production server: `yarn start`

## Database

The project uses PostgreSQL, which is set up as part of the Docker development environment. No additional setup is required for local development.

## Deployment

The project is configured for deployment on Vercel. For detailed deployment instructions, please refer to the [Vercel documentation for Next.js](https://vercel.com/docs/frameworks/nextjs).

## API Reference

For information on accessing Supabase and using Supabase REST and GraphQL APIs, please refer to our [API Reference Documentation](./API_REFERENCE.md).

## Development Container Configuration

The project uses a custom dev container configuration. Here's an overview of the `devcontainer.json` file:

```json
{
	"name": "Node.js & Mongo DB",
	"dockerComposeFile": "docker-compose.yml",
	"service": "app",
	"workspaceFolder": "/workspaces/${localWorkspaceFolderBasename}",
	"customizations": {
		"vscode": {
			"extensions": [
				"mongodb.mongodb-vscode"
			]
		}
	},
	"features": {
		"ghcr.io/devcontainers-community/npm-features/typescript:1": {}
	}
}
```

This configuration sets up a Node.js and MongoDB environment, includes the MongoDB VS Code extension, and adds TypeScript support.

## Troubleshooting

- If you need the environment variables Teams me.
- If you encounter issues with OAuth authentication (GitHub or Google), please check your environment variables and Supabase configuration.
- For any other issues or questions, please open an issue in the GitHub repository.

---

For more detailed information about using Supabase with this project, please refer to our [API Reference Documentation](./API_REFERENCE.md).
```
