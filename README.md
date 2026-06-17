<div align="center">

# 🌸 DIGIFLOW

**An Immersive, Intelligent Bouquet Builder**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![Convex](https://img.shields.io/badge/Convex-Backend-FF5A5F?style=for-the-badge)](https://convex.dev/)

*Create stunning, naturalistic digital bouquets set in breathtaking, animated Ghibli-inspired world environments.*

</div>

<br />

## ✨ The Vision

**DIGIFLOW** goes beyond traditional digital greeting cards. It is an interactive, premium floral design experience. With a sophisticated stem-based layout system, users can craft cohesive, naturalistic bouquet arrangements. Each bouquet is then placed within one of six stunning, immersive "Ghibli World" environments, complete with high-performance atmospheric animations.

Whether it's sending a bouquet under a starry night with shooting stars, or a serene beach with rolling waves, Digiflow ensures a deeply moving and memorable experience for the recipient.

---

## 🌟 Key Features

*   **Intelligent Bouquet Builder:** Transitioned from basic "stacked picture" aesthetics to a cohesive, naturalistic arrangement. Features full-image integrity, precise manual rotation controls, and background-transparent floral assets.
*   **Ghibli-Inspired Environments:** Six meticulously crafted world settings:
    *   🌲 **Forest:** Enchanting fireflies and gentle foliage sway.
    *   🏖️ **Beach:** Serene rolling ocean waves and sunlit atmosphere.
    *   🌌 **Aurora:** Dancing northern lights across a majestic sky.
    *   ✨ **Starry Night:** Twinkling stars and fast, dynamic meteors.
    *   ⛰️ **Mountain:** Crisp air and subtle majestic peaks.
    *   🌧️ **Rain:** Gentle, melancholic, and soothing rainfall.
*   **High-Fidelity Animations:** Powered by Framer Motion and custom CSS, providing smooth, hardware-accelerated atmospheric effects (sway, float, particle systems) decoupled from positioning for flawless rendering.
*   **Personalized Messaging:** A beautiful, responsive card interface with support for various elegant typographies (Cinzel, Caveat, Homemade Apple) for sender and recipient names.
*   **Real-time Data Persistence:** Utilizing Convex for seamless, instant backend state management, ensuring bouquet metadata and user configurations are instantly saved and flawlessly rendered for the recipient.

---

## 🛠️ Technology Stack

*   **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
*   **Library:** [React 19](https://react.dev/)
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/) & Custom CSS Keyframes
*   **Database & Backend:** [Convex](https://convex.dev/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Fonts:** Next/Font (Google Fonts)

---

## 🎨 Design System & Aesthetics

Digiflow prioritizes visual excellence and a premium feel. The application utilizes a curated watercolor-inspired palette:

*   `Cream` & `Beige` for a soft, inviting canvas.
*   `Dusty Pink`, `Sage`, `Lavender`, and `Sunset` for organic, floral accents.
*   `Navy` and `Brown` for deep, grounding contrasts.
*   A subtle, noise-filtered watercolor texture base provides a tactile, organic feel to the entire application.

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18 or higher)
*   npm, yarn, pnpm, or bun

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/digiflow.git
    cd digiflow
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the Convex Development Server**
    Open a new terminal window and run:
    ```bash
    npx convex dev
    ```
    *(This will set up your Convex backend and synchronize your schema)*

4.  **Start the Next.js Development Server**
    In your original terminal, run:
    ```bash
    npm run dev
    ```

5.  **Open the App**
    Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```text
digiflow/
├── convex/               # Convex backend functions and schema
├── src/
│   ├── app/              # Next.js 16 App Router (Pages & Layouts)
│   ├── components/       # Reusable UI components and complex builders
│   │   ├── create/       # Bouquet builder specific components
│   │   ├── ...
│   └── ...
├── public/               # Static assets (images, textures)
└── ...
```

---

<div align="center">
  <p>Built with passion to bring digital connections to life.</p>
</div>
