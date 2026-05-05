# Deployment Guide: CodeShare on Render

This guide explains how to deploy your CodeShare application to Render using Supabase as the backend.

## 1. Supabase Setup

1.  **Create a Supabase Project**: Go to [supabase.com](https://supabase.com/) and create a new project.
2.  **Run SQL Schema**: In your Supabase Dashboard, go to **SQL Editor** and paste the content of `supabase_schema.sql` (found in the artifacts folder) and click **Run**.
3.  **Get API Keys**: Go to **Project Settings** > **API**. Copy the **Project URL** and the **anon public** key.

## 2. Backend Deployment (Render)

1.  **Connect GitHub**: Log in to [Render](https://render.com/) and connect your GitHub repository.
2.  **Create a New Web Service**:
    *   Select the `codeshare-backend` folder as the **Root Directory**.
    *   Set the **Environment** to `Docker`.
    *   **Environment Variables**: Add the following:
        *   `SUPABASE_URL`: (Your Supabase Project URL)
        *   `SUPABASE_ANON_KEY`: (Your Supabase anon key)
        *   `JWT_SECRET`: (A long random string)
        *   `JWT_EXPIRES_IN`: `48h`
        *   `PORT`: `4000`
3.  **Deploy**: Render will build the Docker image and start your backend.

## 3. Frontend Deployment (Render)

1.  **Create a New Static Site**:
    *   Select the `codeshare-frontend` folder as the **Root Directory**.
    *   **Build Command**: `npm install && npm run build`
    *   **Publish Directory**: `dist`
    *   **Environment Variables**:
        *   `VITE_BACKEND_URL`: (The URL of your Render backend web service, e.g., `https://codeshare-backend.onrender.com`)
2.  **Deploy**: Render will build your React app and host it.

## 4. Final Steps

*   Update your frontend's `VITE_BACKEND_URL` to point to the live backend.
*   In Supabase, you might need to add your Render frontend URL to the **CORS** allowed origins if you encounter issues, though the backend is currently configured to allow all (`*`).

> [!TIP]
> Since you are using the Free tier on Render, the backend might "sleep" after inactivity. The first request after a long break may take ~30 seconds to wake up the server.
