# bitl.pro - Link Shortener Setup Guide

A minimalist, fast link shortener service with QR code generation.

## 🚀 Quick Start

### 1. Prerequisites
- Node.js 18+ installed
- Supabase account
- Netlify account (for deployment)

### 2. Setup Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **Settings → API** and copy:
   - Project URL
   - `anon/public` key
3. Go to **SQL Editor** and run the schema from `supabase-schema.sql`:

```sql
-- Create URLs table
CREATE TABLE urls (
  id SERIAL PRIMARY KEY,
  original_url TEXT NOT NULL,
  short_code VARCHAR(10) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP DEFAULT (NOW() + INTERVAL '1 year')
);

-- Create indexes
CREATE INDEX idx_short_code ON urls(short_code);
CREATE INDEX idx_created_at ON urls(created_at);

-- Enable RLS
ALTER TABLE urls ENABLE ROW LEVEL SECURITY;

-- Create policy
CREATE POLICY "Allow all operations on urls" ON urls
FOR ALL USING (true);
```

### 3. Environment Setup

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Update `.env` with your Supabase credentials:
```
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the app running!

### 5. Build for Production

```bash
# Build the app
npm run build

# Preview the build
npm run preview
```

## 🚀 Deployment to Netlify

### Option 1: Deploy from Git (Recommended)

1. Push your code to GitHub/GitLab
2. Connect your repository to Netlify
3. Set build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Add environment variables in Netlify dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy!

### Option 2: Manual Deploy

```bash
# Build the app
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

## 📱 Features

- ✅ Minimalist monochrome design
- ✅ Inter font with XL typography
- ✅ Full mobile responsiveness
- ✅ QR code generation
- ✅ Copy to clipboard
- ✅ URL validation
- ✅ Fast redirects
- ✅ Clean URLs

## 🔧 Configuration

### Custom Domain (Optional)

1. In Netlify dashboard, go to **Domain Settings**
2. Add your custom domain (e.g., `bitl.pro`)
3. Update DNS records as instructed
4. Enable HTTPS

### Supabase Security (Production)

1. Enable Row Level Security (RLS)
2. Create specific policies for your use case
3. Consider rate limiting
4. Set up proper CORS settings

## 📂 Project Structure

```
src/
├── components/
│   ├── HomePage.jsx          # Main landing page
│   ├── ShortLinkPage.jsx     # Result display page
│   └── RedirectPage.jsx      # Handles redirects
├── lib/
│   ├── supabase.js          # Database operations
│   ├── supabaseHelpers.js   # Helper functions
│   ├── utils.js             # Utility functions
│   └── qrcode.js            # QR code generation
├── App.jsx                  # Main app component
└── main.jsx                 # Entry point
```

## 🛠️ Customization

### Colors
Edit `tailwind.config.js` to customize the monochrome palette:

```js
colors: {
  'black': '#000000',
  'white': '#FFFFFF', 
  'gray': '#666666',
  'light-gray': '#FAFAFA',
}
```

### Typography
The app uses Inter font. To change fonts, update the Google Fonts import in `src/index.css`.

### Short Code Length
Modify the length in `src/lib/supabaseHelpers.js`:

```js
const generateRandomCode = (length = 6) => {
  // Change length here
}
```

## 🚨 Troubleshooting

### Build Errors
- Ensure all environment variables are set
- Check Node.js version (18+)
- Clear cache: `rm -rf node_modules package-lock.json && npm install`

### Supabase Connection Issues
- Verify URL and key in `.env`
- Check Supabase project status
- Ensure RLS policies allow operations

### Deployment Issues
- Check build logs in Netlify
- Verify environment variables are set in Netlify
- Ensure `dist` folder is being deployed

## 📄 License

This project is created for educational purposes. Feel free to modify and use as needed.

---

**Need help?** Check the Supabase and Netlify documentation for detailed guides.