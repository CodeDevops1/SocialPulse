# Social Media Analytics Platform

A comprehensive social media analytics platform built with React, featuring real-time analytics, multi-platform management, and content scheduling.

## Features

- 📊 **Real-time Analytics** - Track followers, engagement, and reach across platforms
- 📱 **Multi-Platform Support** - Facebook, Twitter, Instagram, LinkedIn integration
- 📅 **Content Scheduling** - Plan and schedule posts with calendar interface
- 🎨 **Professional UI** - Modern, responsive design with Tailwind CSS
- 📈 **Interactive Charts** - Data visualization with Recharts
- 🔐 **Secure Authentication** - JWT-based user authentication

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS
- **UI Components**: Shadcn/UI, Radix UI
- **Charts**: Recharts
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Backend**: Flask API (deployed separately)

## Deployment

This project is configured for deployment on Vercel with automatic builds and environment variable management.

### Environment Variables

- `REACT_APP_API_URL` - Backend API URL
- `REACT_APP_ENVIRONMENT` - Environment (production/development)

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start development server:
   ```bash
   pnpm run dev
   ```

3. Build for production:
   ```bash
   pnpm run build
   ```

## Live Demo

Try the demo account to explore all features without registration.

## Backend API

The backend API is deployed separately and provides:
- User authentication and management
- Social media account integration
- Analytics data processing
- Content scheduling and management

