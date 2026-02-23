# Optiviz – AI Career Coach 🚀

Optiviz is an AI-powered career coaching web application that helps students and young professionals find the right career path. Many learners struggle with questions like *"Which field should I choose?"*, *"What skills should I learn?"*, and *"How do I build a roadmap?"*. Optiviz solves this by acting as a **personal AI career mentor** that provides clear, personalized, and structured guidance.

Using Google Gemini AI, the platform analyzes a user's interests, goals, and current skills through a smart onboarding process and then generates customized career recommendations and learning roadmaps. Users can securely log in, save their progress, and revisit their guidance anytime.

---

## ✨ Key Features

- 🤖 **AI-Powered Career Guidance** – Personalized career paths and learning suggestions using Gemini AI  
- 🧠 **Smart Onboarding** – Understands user interests and goals before giving recommendations  
- 🔐 **Secure Authentication** – Login and user management using Clerk  
- 📊 **Saved User Progress** – Stores user profiles and recommendations with PostgreSQL & Prisma  
- 🎨 **Modern Responsive UI** – Clean interface built with Tailwind CSS & ShadCN UI  
- ⚡ **Full-Stack Performance** – Next.js App Router & Server Actions for smooth experience  

---

## 🌟 What Makes Optiviz Special?

Unlike common career guidance websites that provide generic advice, Optiviz offers:

- Personalized AI-generated career roadmaps  
- Interactive onboarding for better recommendations  
- Saved guidance so users can continue anytime  
- 24/7 AI mentor experience  
- Fast, modern full-stack web application  

Optiviz doesn't just give information — it gives **direction**.

---

## 🎯 Why Optiviz?

Many students lack proper mentorship and feel confused about career decisions. Optiviz bridges this gap by providing:

- Clear career direction  
- Step-by-step learning plans  
- Reduced confusion and time waste  
- Structured and goal-oriented guidance  

It works like a personal career counselor — powered by AI.

---

## 🛠️ Tech Stack

**Frontend:**  
- Next.js (App Router)  
- React  
- Tailwind CSS  
- ShadCN UI  

**Backend:**  
- Next.js Server Actions  
- Prisma ORM  

**Database:**  
- PostgreSQL (Neon)  

**Authentication:**  
- Clerk  

**AI Engine:**  
- Google Gemini API  

---

## 📦 Steps to Clone and Run Locally

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/NikhilNayak12/Optiviz.git
cd optiviz
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file in the root and add:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

DATABASE_URL=your_postgresql_database_url
GEMINI_API_KEY=your_gemini_api_key
```

### 4️⃣ Setup Database
```bash
npx prisma generate
npx prisma migrate deploy
```

### 5️⃣ Run the Project
```bash
npm run dev
```

App runs at: **http://localhost:3000**

---

## 🚀 Deployment

Optiviz is optimized for Vercel deployment.

1. Push project to GitHub
2. Import repository in Vercel
3. Add environment variables
4. Click Deploy

Done ✅
