# BrainApp

A Next.js application for tracking daily mental health and well-being. The app allows users to log their daily feelings, symptoms, triggers, and focus areas.

## Features

- User authentication with Firebase
- Daily check-in system
- Interactive UI with slider and text inputs
- Responsive design
- Modern UI with Tailwind CSS

## Tech Stack

- Next.js 13+
- React 18
- TypeScript
- Firebase (Authentication)
- Tailwind CSS
- Framer Motion

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/brainapp.git
cd brainapp
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with your Firebase configuration:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## License

MIT
