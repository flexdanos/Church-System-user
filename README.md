# React Supabase PWA

A Progressive Web Application built with React, TypeScript, Tailwind CSS, and Supabase for authentication and database functionality.

## Features

- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **Supabase** for authentication and database
- **PWA** support with offline capabilities
- **Vite** for fast development and building

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- Supabase account and project

### Installation

1. Clone this repository or navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

### Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Navigate to Settings > API
3. Copy your Project URL and anon key
4. Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url_here
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

### Running the App

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment

### Vercel Deployment

1. **Push to GitHub**: 
   - Make sure your code is pushed to the `stagging` branch
   - Vercel will automatically deploy from this branch

2. **Environment Variables**:
   - Go to your Vercel project settings
   - Add these environment variables:
     - `SUPABASE_URL`: Your Supabase project URL
     - `SUPABASE_ANON_KEY`: Your Supabase anonymous key

3. **Build Settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install --legacy-peer-deps`

### Manual Deployment

If you encounter dependency issues during deployment:

```bash
# Use legacy peer deps for compatibility
npm install --legacy-peer-deps
npm run build
```

### Troubleshooting

**ERESOLVE Error**: If you get dependency resolution errors, the project is configured to use `--legacy-peer-deps` for compatibility between Vite and PWA plugin versions.

## PWA Features

This application includes PWA capabilities:
- Service worker for offline support
- Web app manifest for installability
- Responsive design for mobile devices

## Project Structure

```
src/
├── components/
│   ├── Auth.tsx          # Authentication component
│   └── Dashboard.tsx     # Main dashboard component
├── contexts/
│   └── AuthContext.tsx   # Authentication context
├── lib/
│   └── supabase.ts       # Supabase client configuration
├── App.tsx               # Main application component
└── index.css             # Global styles with Tailwind
```

## Authentication

The app includes a complete authentication system with:
- Sign up functionality
- Sign in functionality
- Session management
- Protected routes

## Usage

1. Open the app in your browser
2. Sign up for a new account or sign in
3. Access the dashboard with user information
4. Install the PWA on your device for offline access

## Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Supabase** - Backend as a Service
- **vite-plugin-pwa** - PWA plugin for Vite

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit and push the changes
5. Create a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
