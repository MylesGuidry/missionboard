# 🚀 MissionBoard

MissionBoard is a full-stack web application that allows users to explore upcoming space launches, track mission details, participate in mission discussions, and save favorite launches.

Built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Supabase**, the application integrates live launch data from the SpaceDevs Launch Library API while providing a modern mission control-inspired interface.

---

## ✨ Features

### 🔐 Authentication
- Secure user registration and login
- Supabase Authentication
- Persistent user sessions
- Custom usernames
- User profiles

### 🚀 Mission Dashboard
- Browse upcoming launches
- Search missions instantly
- Mission countdowns
- NASA Astronomy Picture of the Day
- Mission readiness overview
- Responsive dashboard layout

### 📄 Mission Details
- Detailed mission information
- Live countdown timer
- Mission description
- Launch status
- Rocket information
- Launch provider
- Launch site
- Mission imagery
- Favorite missions

### 💬 Mission Discussions
- Community discussion board
- Create comments
- View mission conversations
- Comment history

### 👤 User Profiles
- Favorite missions
- Discussion history
- User statistics
- Personalized profile page

### 🎨 User Experience
- Modern dark UI
- Responsive design
- Animated astronaut loading screen
- Empty state components
- Reusable React components
- Fast page navigation

---

# 📸 Screenshots

---

## Mission Details

*(Add screenshot)*

---

## Discussion Board

*(Add screenshot)*

---

## Profile

*(Add screenshot)*

---

# 🛠 Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

## Backend

- Supabase
- PostgreSQL

## APIs

- SpaceDevs Launch Library API
- NASA Astronomy Picture of the Day API

## Deployment

- Vercel

## Tools

- Git
- GitHub
- VS Code

---

# 🚀 Installation

Clone the repository

```bash
git clone https://github.com/Thinktank02/missionboard.git
```

Move into the project

```bash
cd missionboard
```

Install dependencies

```bash
npm install
```

Create a `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
NASA_API_KEY=YOUR_NASA_API_KEY
```

Start the development server

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

# 📁 Project Structure

```
MissionBoard
│
├── app
│   ├── dashboard
│   ├── discussion
│   ├── login
│   ├── mission
│   ├── profile
│   ├── loading.tsx
│   └── layout.tsx
│
├── components
│   ├── FavoriteButton.tsx
│   ├── LaunchButton.tsx
│   ├── MissionSearchList.tsx
│   ├── SpaceLoader.tsx
│   ├── SpaceLoader.css
│   └── UserNav.tsx
│
├── lib
│   ├── launches.ts
│   ├── supabase.ts
│   └── ...
│
├── public
│
└── README.md
```

---

# 🎯 Future Improvements

- Live updating countdown timer
- Mission notifications
- Advanced search filters
- User avatars
- Launch calendar
- Mobile optimization
- Additional NASA integrations
- Mission analytics dashboard

---

# 💡 Why I Built This

MissionBoard was created as a portfolio project to demonstrate modern full-stack software engineering concepts through a real-world application.

The project showcases:

- Authentication with Supabase
- Database-driven features
- External API integration
- Responsive UI design
- Reusable React components
- TypeScript development
- Modern Next.js App Router architecture

---

# 📄 License

This project is licensed under the MIT License.
