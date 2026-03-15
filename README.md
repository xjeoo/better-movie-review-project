# 🎬 Movie Review Platform

> A full-stack movie discovery platform where users can search for TV shows, read details, and create or update custom reviews.

## 🚀 Live Demo
[Link here](https://better-movie-review-project.vercel.app/)

## 📸 Screenshots
<img width="1900" height="915" alt="image" src="https://github.com/user-attachments/assets/1a2df95a-f1c1-47d4-aeb2-dd76bf86dea2" />
<img width="1905" height="917" alt="image" src="https://github.com/user-attachments/assets/b9cae646-9438-4d28-9725-4d96daf82177" />



## ✨ Key Features


* **Custom Authentication:** Secure login and registration using NextAuth.js, supporting both credentials and Google OAuth.
* **CRUD Operations:** Users can easily create, read, update, and delete their personalized movie reviews.
* **Responsive UI:** A fully responsive, modern interface built with Tailwind CSS and shadcn/ui, optimized for all devices.
* **Type Safety:** Entire codebase is strictly typed with TypeScript, minimizing runtime errors and improving maintainability.

## 🛠️ Tech Stack
* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS, shadcn
* **Backend & Database:** Next.js API Routes, MongoDB, Mongoose
* **Authentication:** Implemented a hybrid approach using **NextAuth.js**. Features include custom credential-based login (Email/Password) and third-party provider integration (Google OAuth), with fully managed custom session handling.

## 🚀 Running Locally

To run this project on your local machine, follow these steps:

### 1. Clone the repository
```bash
git clone <link-of-this-repository>
```

### 2. Install dependencies
```
cd <repository-folder-name>
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory of the project. 

Copy the structure below and replace the placeholder values with your own API keys and credentials. The constant variables (like `NEXTAUTH_URL` and `SECURE_COOKIES`) are already set for local development.

```env
# Database
MONGODB_URI="your_mongodb_connection_string"

# NextAuth & Security
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_generated_nextauth_secret"
SESSION_SECRET="your_generated_session_secret"
SECURE_COOKIES="true" # Set to "false" if you have issues on local HTTP

# Google OAuth Provider
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# TMDB API (The Movie Database)
TMDB_API_KEY="your_tmdb_api_key"
TMDB_READ_ACCESS_KEY="your_tmdb_read_access_key"
```
### 4. Start the local development server
```
npm run dev
```

### 5. Open http://localhost:3000 in your browser to see the application
