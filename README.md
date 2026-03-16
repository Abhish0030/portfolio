# Portfolio

This is a portfolio site built with React, TypeScript, Vite, and a small Node server for the AI resume assistant.

## Running the code

Run `npm i` to install the dependencies.

Copy `.env.example` to `.env` and add your `OPENAI_API_KEY` if you want the resume assistant to use OpenAI.

Run `npm run dev` to start the frontend development server.

Run `npm run dev:api` in a second terminal to start the local API server for the resume assistant.

Run `npm run build` and then `npm run serve` to serve the production build with the same API route.

## Hostinger deployment

Deploy this project as a Node.js app, not a static site, because the resume assistant uses a backend API route.

Recommended Hostinger values:

- Install command: `npm install`
- Build command: `npm run build`
- Start command: `npm start`

Add these environment variables in hPanel before building:

- `OPENAI_API_KEY`
- `VITE_EMAIL_SERVICE_ID`
- `VITE_EMAIL_TEMPLATE_ID`
- `VITE_EMAIL_PUBLIC_KEY`
