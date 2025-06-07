

# ProxiList - Your Smart Shopping Companion

ProxiList is a Next.js application designed to make your shopping experience smarter and more efficient. It helps you discover nearby stores, manage your shopping lists, and even get intelligent item suggestions powered by AI.

## Key Features

*   **Nearby Store Discovery:** Easily find stores in your vicinity. (Currently uses mock data, can be expanded with real location services).
*   **Shopping List Management:**
    *   Create, rename, and delete multiple shopping lists.
    *   Add, edit, and remove items from your lists.
    *   Mark items as purchased.
    *   Associate lists with specific stores (optional).
*   **AI-Powered Smart Suggestions:** Get personalized item recommendations based on your current location (e.g., a nearby store) and past purchase history using Genkit and Google's Gemini model.
*   **Categorized Items:** Organize shopping list items by category (e.g., Groceries, Electronics).
*   **Promotion Tracking:** View mock promotions available at different stores.

## Tech Stack

*   **Frontend:**
    *   [Next.js](https://nextjs.org/) (App Router)
    *   [React](https://reactjs.org/)
    *   [TypeScript](https://www.typescriptlang.org/)
    *   [Tailwind CSS](https://tailwindcss.com/)
    *   [ShadCN UI](https://ui.shadcn.com/) (Component Library)
    *   Lucide React (Icons)
*   **AI / Generative Features:**
    *   [Genkit (Firebase Genkit)](https://firebase.google.com/docs/genkit)
    *   Google AI (Gemini 2.0 Flash model)
*   **Styling:** Tailwind CSS, ShadCN UI default theme (customizable via `src/app/globals.css`).

## Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm or yarn

### Installation

1.  **Clone the repository (if applicable) or ensure you are in the project directory.**
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    ```
3.  **Environment Variables:**
    *   This project uses Genkit with Google AI. You'll need to set up authentication for Google Cloud and potentially configure API keys. Create a `.env` file in the root of your project if it doesn't exist.
    *   Refer to the [Genkit documentation](https://firebase.google.com/docs/genkit/get-started-node#set_up_auth) and [Google AI plugin for Genkit](https://firebase.google.com/docs/genkit/plugins/google-ai) for specific environment variables required (e.g., `GOOGLE_API_KEY` if using API key authentication).
    *   Example `.env` structure:
        ```
        GOOGLE_API_KEY=your_google_api_key_here
        ```

### Running the Development Server

1.  **Run the Next.js application:**
    ```bash
    npm run dev
    ```
    This will start the Next.js development server, typically on `http://localhost:9002`. The AI-powered smart suggestions will work as part of the Next.js server actions.

2.  **(Optional) Run the Genkit Developer UI:**
    For developing and inspecting AI flows with the Genkit Developer UI, run the following command in a separate terminal:
    ```bash
    npm run genkit:watch
    # or for a single run without watching
    # npm run genkit:dev
