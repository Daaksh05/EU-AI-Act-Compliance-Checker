# Database Setup Guide

This guide explains how to connect the **EU AI Act Compliance Engine** to a permanent PostgreSQL database.
Currently, the application uses SQLite for local development, but for a live deployment on Vercel, you need a cloud database.

## Option 1: Neon via Vercel Marketplace (Recommended)

Vercel now recommends using the **Neon** integration for new Postgres databases.

1.  **Go to your Project Dashboard** on [Vercel](https://vercel.com/dashboard).
2.  Navigate to the **Storage** tab.
3.  If you see "Create Database" -> "Postgres", use that.
    **IF NOT**: Look for a link to the **Marketplace** or **Integrations**.
4.  Search for **Neon**.
5.  Click **Add Integration**.
6.  Select your Vercel account/team and the `eu-ai-act-compliance-engine` project.
7.  Follow the prompts to create a new Neon project:
    - **Database Name**: You can name it `eu-ai-compliance-db` or keep the auto-generated one (e.g., `neon-purple-house`). It doesn't affect functionality.
    - **Region**: Select the one closest to you (e.g., Washington D.C. or Frankfurt). Default is usually fine.
    - **Auth**: Leave this **OFF**. Your application already has its own authentication system.
    - **Plan**: Select **Free** (0.5 GB storage).
    - Click **Create**.
    - This will automatically add the necessary environment variables (like `POSTGRES_URL`) to your Vercel project.

8.  **Redeploy** your application.
    - Go to **Deployments**.
    - Click the three dots on the latest deployment -> **Redeploy**.

## Option 2: Supabase (Alternative)

If you prefer Supabase:

1. Create a new project on [Supabase.com](https://supabase.com).
2. Go to **Project Settings** -> **Database**.
3. Under **Connection String**, select **URI**.
4. Copy the connection string. It will look like:
   `postgresql://postgres:[YOUR-PASSWORD]@db.project-ref.supabase.co:5432/postgres`
5. Go to your Vercel Project Dashboard.
6. Navigate to **Settings** -> **Environment Variables**.
7. Add a new variable:
   - **Key**: `POSTGRES_URL`
   - **Value**: [Paste your Supabase connection string]
8. **Redeploy** your application on Vercel.

## Verifying the Connection

After redeploying:

1. Visit your app's API status endpoint: `https://your-app-name.vercel.app/api`
2. You should see a JSON response. Check the `database` field:
   ```json
   {
     "status": "ok",
     "message": "EU AI Act Compliance API is running",
     "database": "Connected"
   }
   ```
   If it says "Connected", you are using the permanent database!

## Local Development (Optional)

To use the same database locally:

1. Create a `.env` file in the project root if it doesn't exist.
2. Add the `POSTGRES_URL`:
   ```bash
   POSTGRES_URL="postgres://..."
   ```
3. Restart your local server (`uvicorn api.index:app --reload` or `npm run dev`).
