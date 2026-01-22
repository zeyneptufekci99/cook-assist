# Cook Assist 🍳

A React + TypeScript + Vite application that helps you generate recipes based on available ingredients using Groq AI (free tier available).

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Groq API Key (Ücretsiz!)

1. Get your free Groq API key from [https://console.groq.com/keys](https://console.groq.com/keys)
2. Create a `.env` file in the root directory
3. Add your API key:

```env
VITE_GROQ_API_KEY=your_groq_api_key_here
```

**Not:** Groq was chosen because it offered a free tier.

### 3. Run the Development Server

```bash
npm run dev
```

## Features

- Add ingredients manually
- Select oils, flours, spices, and salt preferences
- Generate creative recipes using Groq AI (Llama 3.1 70B model)
- Beautiful, modern UI with Tailwind CSS
