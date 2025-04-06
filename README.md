# Clip-Cognition

A Next.js application with Clerk authentication, Firebase integration, and ngrok tunneling.

## 📝 Project Overview

Clip-Cognition is an innovative video-based quiz platform that transforms video content into interactive learning experiences. The platform allows users to:

- 📹 Upload videos and create quizzes based on their content
- ❓ Generate random questions from video content
- ⏱️ Get timestamp-based feedback for incorrect answers
- 🏆 Compete on leaderboards for each quiz
- 📊 Track learning progress and performance

### Key Features

1. **Video Upload & Processing**

   - Upload videos in various formats
   - Automatic video processing and analysis
   - Secure storage using Firebase

2. **Quiz Creation**

   - Generate questions from video content
   - Customize quiz parameters
   - Set difficulty levels
   - Add time-based questions

3. **Interactive Quiz Experience**

   - Random question selection
   - Timestamp-based feedback
   - Real-time answer validation
   - Progress tracking

4. **Leaderboard System**

   - Quiz-specific leaderboards
   - Performance metrics
   - Achievement tracking
   - Competitive scoring system

5. **User Management**
   - Secure authentication with Clerk
   - Profile management
   - Quiz history
   - Performance analytics

### Technology Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Authentication**: Clerk
- **Backend**: Flask (Python)
- **Database**: Firebase
- **Storage**: Firebase Storage
- **Video Processing**: Custom video analysis with Python
- **Deployment**: Vercel
- **Development**: ngrok for local testing

## 🚀 Quick Start

1. Clone the repository
2. Install dependencies
3. Set up environment variables
4. Configure ngrok
5. Start the development server

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- ngrok account
- Clerk account
- Firebase account

## 🔧 Installation

1. Clone the repository:

```bash
git clone <your-repository-url>
cd clip-cognition
cd client
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

## 🔐 Environment Variables Setup

### Client-side (.env file in client directory)

Create a `.env` file in the client directory with the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Server URL (Update this with your ngrok URL when running)
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
```

### Server-side Configuration Files

Instead of using a `.env` file, the Flask backend uses two JSON configuration files:

1. **secret.json** (Server Configuration)
   Create a `secret.json` file in the server directory with the following structure:

   ```json
   {
     "PORT": 8080,
     "NODE_ENV": "development",
     "CLERK_SECRET_KEY": "your_clerk_secret_key",
     "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY": "your_clerk_publishable_key",
     "FIREBASE_PROJECT_ID": "your_firebase_project_id",
     "FIREBASE_PRIVATE_KEY": "your_firebase_private_key",
     "FIREBASE_CLIENT_EMAIL": "your_firebase_client_email",
     "DATABASE_URL": "your_database_url"
   }
   ```

2. **api.json** (API Configuration)
   Create an `api.json` file in the server directory with the following structure:
   ```json
   {
     "OPENAI_API_KEY": "your_openai_api_key",
     "GOOGLE_API_KEY": "your_google_api_key",
     "VIDEO_PROCESSING_API_KEY": "your_video_processing_api_key",
     "MAX_VIDEO_SIZE": 500000000,
     "ALLOWED_VIDEO_FORMATS": ["mp4", "mov", "avi", "mkv"],
     "MAX_QUESTIONS_PER_VIDEO": 10,
     "DEFAULT_QUIZ_DURATION": 3600
   }
   ```

### Flask Backend Setup

1. Navigate to the server directory:

```bash
cd server
```

2. Create a Python virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install Python dependencies:

```bash
pip install -r requirements.txt
```

4. Create the configuration files:

```bash
touch secret.json api.json
```

5. Start the Flask server:

```bash
python app.py
```

### Flask Backend Structure

```
server/
├── requirements.txt    # Python dependencies
├── secret.json          # Server secrets and configuration
├── api.json            # API keys and settings
├── app.py              # Flask application entry point
├── config/        # Configuration modules
├── services/      # Business logic
└──  utils/         # Utility functions

```

### Flask Backend Features

1. **Video Processing**

   - Video upload and validation
   - Frame extraction using OpenCV
   - Content analysis with NLP
   - Metadata generation

2. **Quiz Generation**

   - Question generation using OpenAI API
   - Context-aware question creation
   - Timestamp mapping
   - Difficulty calculation

3. **API Endpoints**

   ```python
   # Video Processing
   POST /api/video/upload
   POST /api/video/process
   GET  /api/video/{id}/status

   # Quiz Management
   POST /api/quiz/generate
   GET  /api/quiz/{id}
   POST /api/quiz/{id}/submit
   GET  /api/quiz/{id}/leaderboard
   ```

4. **Security Features**
   - API key validation
   - Rate limiting
   - CORS configuration
   - Input sanitization

## 🔄 Getting Your Secrets

### Clerk Setup

1. Go to [Clerk Dashboard](https://dashboard.clerk.dev)
2. Create a new application
3. Navigate to API Keys section
4. Copy the Publishable Key and Secret Key
5. Add these to your `.env` file

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Add a web app to your project
4. Copy the configuration object
5. Add the values to your `.env` file

### Firebase Admin SDK Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to Project Settings > Service Accounts
4. Click "Generate New Private Key"
5. Save the downloaded JSON file
6. Extract the following values from the JSON:
   - `project_id` → `FIREBASE_PROJECT_ID`
   - `private_key` → `FIREBASE_PRIVATE_KEY`
   - `client_email` → `FIREBASE_CLIENT_EMAIL`

## 🌐 Ngrok Configuration

1. Install ngrok:

```bash
npm install -g ngrok
# or
brew install ngrok
```

2. Sign up for an ngrok account at [ngrok.com](https://ngrok.com)

3. Get your authtoken from the ngrok dashboard and configure it:

```bash
ngrok config add-authtoken your_authtoken
```

4. Start ngrok tunnel:

```bash
ngrok http 3000
```

5. Copy the HTTPS URL provided by ngrok and update your `.env` file:

```env
NEXT_PUBLIC_SERVER_URL=https://your-ngrok-url.ngrok.io
```

## 🚀 Running the Application

1. Start the development server:

```bash
npm run dev
# or
yarn dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📦 Project Structure

```
clip-cognition/
├── client/                 # Next.js frontend
│   ├── .env               # Client-side environment variables
│   ├── config/            # Configuration files
│   └── ...                # Other Next.js files
└── ...                    # Other project files
```

## 🖥️ Server Setup and Running

### Starting the Server

1. Navigate to the server directory:

```bash
cd server
```

2. Install server dependencies:

```bash
npm install
# or
yarn install
```

3. Start the server:

```bash
npm run dev
# or
yarn dev
```



## 🔐 Security Notes

- Never commit your `.env` files to version control
- Keep your Clerk and Firebase secrets secure
- Regularly rotate your API keys and secrets
- Use environment-specific configurations for different deployment environments

## 🛠️ Troubleshooting

### Common Issues

1. **Clerk Authentication Issues**

   - Ensure your ngrok URL is properly configured in Clerk dashboard
   - Verify all Clerk environment variables are correctly set

2. **Firebase Connection Problems**

   - Check if Firebase project is properly configured
   - Verify all Firebase environment variables are correct

3. **Ngrok Tunnel Issues**
   - Ensure ngrok is running and accessible
   - Check if the tunnel URL matches your configuration

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.dev/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Ngrok Documentation](https://ngrok.com/docs)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request


