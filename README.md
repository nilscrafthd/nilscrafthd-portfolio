# Portfolio - NilsCraftHD

A modern portfolio project built with Next.js.

## 🚀 Installation

Make sure you have Node.js installed on your system.

1. **Clone the repository**
   ```bash
   git clone https://github.com/nilscrafthd/nilscrafthd-portfolio
   cd portfolio-nilscrafthd
   ```

2. **Install dependencies**
   ```bash
   npm i
   ```

3. **Configure Environment Variables**

   You need to set up your environment variables for the GitHub API and Discord webhook to work properly.

   **Option A: Local Development (.env file)**
   
   Rename `example.env` to `.env` and fill in your credentials:
   ```bash
   cp example.env .env
   ```
   
   Then edit the `.env` file with your actual values:
   ```env
   # GitHub Personal Access Token (get from: https://github.com/settings/tokens)
   GITHUB_TOKEN=your_github_token_here
   
   # Discord Webhook URL (get from your Discord server webhook settings)
   DISCORD_WEBHOOK_URL=your_discord_webhook_url_here
   ```

   **Option B: Vercel Deployment**
   
   If you're deploying to Vercel, set the environment variables in your Vercel dashboard:
   1. Go to your project settings in Vercel
   2. Navigate to "Environment Variables"
   3. Add the following variables:
      - `GITHUB_TOKEN`: Your GitHub personal access token
      - `DISCORD_WEBHOOK_URL`: Your Discord webhook URL

   **How to get the required tokens:**
   - **GitHub Token**: Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens) and create a new token with `repo` permissions
   - **Discord Webhook**: In your Discord server, go to Server Settings > Integrations > Webhooks > New Webhook

   **Security Note:** Never commit your `.env` file to git. Make sure `.env` is in your `.gitignore` file.

## 🛠️ Development

To start the project in development mode:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 🏗️ Build

To build the project for production:

```bash
npm run build
```

The optimized files will be created in the `.next` folder.

## 📁 Project Structure

```
portfolio-nilscrafthd/
├── components/
├── pages/
├── public/
├── styles/
└── ...
```

## ⚠️ Important Notice

**The footer must NOT be modified or removed under any circumstances!**

Any modifications to the footer are strictly prohibited and may result in legal consequences.

## 🛡️ License

This portfolio belongs to NilsCraftHD. All rights reserved.

---

Created with ❤️ by **NilsCraftHD**
