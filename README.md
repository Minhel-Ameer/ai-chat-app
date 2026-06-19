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
VITE_MISTRAL_API_KEY=your_mistral_api_key
```

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

### VITE_MISTRAL_API_KEY

Required for authenticating requests to the Mistral AI API.

Example:

```env
VITE_MISTRAL_API_KEY=xxxxxxxxxxxxxxxx
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

6. Add Environment Variable:

```env
VITE_MISTRAL_API_KEY=your_mistral_api_key
```

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

## Notes

* Chat history is stored in browser local storage.
* Editing a message regenerates the AI response.
* API keys should never be committed to source control.
* The application uses the Mistral Chat Completion API.

---

## Author

Minhel Ameer

Frontend Developer
