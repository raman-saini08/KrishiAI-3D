<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Krishi-AI

An AI-powered Agriculture & FoodTech platform that helps farmers reduce crop waste by analyzing produce, suggesting fair prices, and connecting them with nearby buyers and sellers.

View your app in AI Studio: https://ai.studio/apps/7618602e-ac71-43e8-b100-cc7de7939ac4

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

---

## 📌 Problem Statement
Post-harvest losses account for massive revenue drops for smallholder farmers due to inadequate storage, absence of reliable grading mechanisms, and exploitation by middlemen. **Krishi-AI** solves this by providing immediate on-device quality grading and an open, localized trading channel before fresh produce deteriorates.

---

## ✨ Key Features Breakdown
* **Visual Quality Grading:** Evaluates skin blemishes, color consistency, and ripeness indicators directly from camera photos using Gemini Multimodal models.
* **Intelligent Shelf-Life Estimation:** Predicts remaining viable storage days to help farmers prioritize which stock needs immediate sale.
* **Dynamic Fair-Price Engine:** Suggests optimal pricing brackets factoring in the evaluated grade and current supply conditions.
* **Direct Farmer-to-Buyer Marketplace:** Eliminates intermediate commission agents by listing lots directly to nearby restaurants, vendors, and food processing units.

---

## 🛠️ Architecture & Tech Stack
* **Frontend:** React / Next.js, Tailwind CSS
* **AI Engine:** Google AI Studio / Gemini API (`gemini-1.5-flash` / `gemini-1.5-pro`)
* **Backend:** Node.js, Next.js Server Actions / API Routes
* **Styling & UI Components:** Lucide Icons, Radix UI

---

## ⚙️ Environment Configuration
Create a `.env.local` file in your root folder and define the following keys:

```env
# Gemini API Key obtained from Google AI Studio
GEMINI_API_KEY=your_gemini_api_key_here

# App URL (optional for production routing)
NEXT_PUBLIC_APP_URL=http://localhost:3000
