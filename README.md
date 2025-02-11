
# 🌱 PlantNet - eCommerce Website for Trees

Welcome to **PlantNet**, an eCommerce platform designed for plant lovers! With PlantNet, users can browse, purchase, and learn about various trees while enjoying a seamless shopping experience. Built with modern web technologies, this project ensures performance, scalability, and ease of use.

---

## 📜 Table of Contents

- [🌱 PlantNet - eCommerce Website for Trees](#-plantnet---ecommerce-website-for-trees)
  - [📜 Table of Contents](#-table-of-contents)
  - [✨ Features](#-features)
  - [💻 Tech Stack](#-tech-stack)
    - [**Frontend**](#frontend)
    - [**Backend \& Services**](#backend--services)
    - [**Development Tools**](#development-tools)
  - [🛠 Installation](#-installation)
  - [⚙️ Configuration](#️-configuration)
    - [**Environment Variables Explained**](#environment-variables-explained)
  - [🚀 Usage](#-usage)
  - [🔥 Examples](#-examples)

---

## ✨ Features

- 🌳 Browse and purchase different types of trees
- 🔍 Advanced search and filtering options
- 🛒 Shopping cart and checkout system (Stripe payments)
- 👤 User authentication via Firebase
- 📊 Interactive charts for plant statistics (Recharts)
- 🎨 Beautiful UI with Tailwind CSS and DaisyUI
- 🔥 Instant notifications with React Hot Toast
- 📷 Image uploading with ImageBB API
- ⚡ High performance with Vite and React Query

---

## 💻 Tech Stack

### **Frontend**
- [React](https://react.dev/) - UI Library
- [React Router](https://reactrouter.com/) - Client-side Routing
- [React Query](https://tanstack.com/query/latest) - State Management
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [DaisyUI](https://daisyui.com/) - UI Components
- [Recharts](https://recharts.org/en-US/) - Data Visualization
- [React Date Range](https://github.com/hypeserver/react-date-range) - Date Picker

### **Backend & Services**
- [Firebase](https://firebase.google.com/) - Authentication & Database
- [Stripe](https://stripe.com/) - Payment Processing
- [ImageBB API](https://api.imgbb.com/) - Image Uploading

### **Development Tools**
- [Vite](https://vitejs.dev/) - Build Tool
- [ESLint](https://eslint.org/) - Code Linter
- [Prettier](https://prettier.io/) - Code Formatter
- [Axios](https://axios-http.com/) - HTTP Client

---

## 🛠 Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/nodeNINJAr/plantNet-client
   cd plantnet
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Start the development server**
   ```sh
   npm run dev
   ```

---

## ⚙️ Configuration

To set up Firebase, Stripe, and ImageBB API, create a `.env` file in the root directory and add the following:

```sh
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_firebase_messaging_sender_id
VITE_appId=your_firebase_app_id
VITE_IMAGE_BB_API=your_imagebb_api_key
VITE_STRIPE_Publishable_KEY=your_stripe_publishable_key
VITE_API_URI=your_backend_api_endpoint
```

### **Environment Variables Explained**
- `VITE_apiKey`: Firebase API key for authentication
- `VITE_authDomain`: Firebase authentication domain
- `VITE_projectId`: Firebase project identifier
- `VITE_storageBucket`: Firebase storage bucket for images/files
- `VITE_messagingSenderId`: Firebase messaging sender ID
- `VITE_appId`: Firebase application ID
- `VITE_IMAGE_BB_API`: API key for ImageBB to upload images
- `VITE_STRIPE_Publishable_KEY`: Publishable key for Stripe payments
- `VITE_API_URI`: API URI for backend requests

---

## 🚀 Usage

1. **Navigate to the website** in your browser.
2. **Create an account** or log in using Firebase Authentication.
3. **Browse through the trees** available for purchase.
4. **Upload images** for plants using the ImageBB API.
5. **Add trees to your cart** and proceed to checkout.
6. **Make secure payments** using Stripe.
7. **Enjoy your plants! 🌱**

---

## 🔥 Examples

Here are some example use cases:

- **A gardener** looking for specific tree species for landscaping.
- **An environment-conscious consumer** purchasing plants to increase greenery.
- **A gift shopper** sending a plant as an eco-friendly present.

---

🌿 **Happy Planting with PlantNet!** 🌿
```
