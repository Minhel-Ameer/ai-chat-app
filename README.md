# AI Chat Application

A modern AI-powered chat application built with React, TypeScript, Material UI, Zustand, and Mistral AI.

## Features

* Chat with Mistral AI
* Multiple conversations
* Edit previously sent messages
* Dark / Light theme support
* Typing indicator
* Persistent chat history
* Responsive design
* Auto-scroll to latest message
* Search conversations
* Rename conversations
* Delete conversations
* Auto-title from first message
* Error notifications
* Mobile-friendly drawer navigation
* Abort ongoing requests on new message

## Tech Stack

* React
* TypeScript
* Vite
* Material UI (MUI)
* Zustand
* Axios
* Mistral AI API

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd ai-chat-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
MISTRAL_API_KEY=your_mistral_api_key
```

> ⚠️ Never commit your `.env` file. It is already listed in `.gitignore`.

### 4. Run the application

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

## Environment Variables

### MISTRAL_API_KEY

Required for authenticating requests to the Mistral AI API. This key is kept secret and only accessed server-side via a Vercel serverless function — it is never exposed to the browser.

Example:

```env
MISTRAL_API_KEY=xxxxxxxxxxxxxxxx
```

---

## Available Scripts

### Start development server

```bash
npm run dev
```

### Build production version

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Run linting

```bash
npm run lint
```

---

## Deployment Instructions (Vercel)

### Deploy via GitHub

1. Push the project to GitHub.
2. Login to Vercel.
3. Click **Add New Project**.
4. Import the GitHub repository.
5. Configure:

```text
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
```

6. Add Environment Variable in Vercel Dashboard → Settings → Environment Variables:

```env
MISTRAL_API_KEY=your_mistral_api_key
```

> ⚠️ Do not use the `VITE_` prefix — this would expose the key to the browser.

7. Click **Deploy**.

### Deploy using Vercel CLI

Install Vercel:

```bash
npm install -g vercel
```

Login:

```bash
vercel login
```

Deploy:

```bash
vercel
```

Production deployment:

```bash
vercel --prod
```

---

## API Security

The Mistral API key is kept secure using a Vercel serverless function (`api/chat.ts`). The frontend never directly calls the Mistral API — all requests are proxied through this function, keeping the API key server-side only.

```text
Browser → /api/chat (Vercel serverless) → Mistral AI API
```

---

## Notes

* Chat history is stored in browser local storage.
* Editing a message regenerates the AI response.
* API keys should never be committed to source control.
* The application uses the Mistral Chat Completion API.

---

## Author

Minhel Ameer

Frontend Developer