# Contact Management System

A professional, full-stack contact management application built with Node.js, Express, MongoDB, and a modern, premium frontend.

## 🚀 Features

- **Premium UI/UX**: Professional dark theme with glassmorphism and smooth animations.
- **Modern Tech Stack**: Built with Node.js (ES Modules) and Mongoose.
- **Full CRUD Support**: Add, view, update, and delete contacts seamlessly.
- **Advanced Search & Filtering**: 
  - Real-time search by name, phone, or country code.
  - Region-based filtering (India, USA, UK).
  - Sorting by newest or oldest entries.
- **Pagination**: Efficiently handle large contact lists with paginated views.
- **Data Validation**: 
  - Name length validation.
  - Robust regex-based phone number validation.
  - Duplicate contact prevention.
- **Toast Notifications**: Interactive feedback for all user actions.

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Frontend**: Vanilla JS, CSS3 (Custom Design System), HTML5
- **Icons**: Lucide Icons
- **Fonts**: Inter (Google Fonts)

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd contact-management
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add your MongoDB URI:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=4000
   ```

4. **Run the application**:
   - For development (with nodemon):
     ```bash
     npm run dev
     ```
   - For production:
     ```bash
     npm start
     ```

5. **Access the App**:
   Open your browser and navigate to `http://localhost:4000`.

## 📁 Project Structure

```text
├── config/             # Database configuration
├── controllers/        # Business logic & route handlers
├── models/             # Mongoose schemas
├── public/             # Static frontend assets (HTML, CSS, JS)
├── routers/            # API route definitions
├── server.js           # Main application entry point
└── package.json        # Dependencies and scripts
```

## 📜 License

This project is licensed under the ISC License.