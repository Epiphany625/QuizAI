# 📚 QuizAI

**QuizAI** is an AI-powered assistant application that helps users:

• Create courses

• Upload learning materials

• Generate quizzes

• Receive personalized feedback

---

### **🧰 Tech Stack**

• **Frontend Web App:** React.js

• **Chrome Extension:** React.js

• **Backend:** Express.js + MongoDB

• **Cloud Services:** Amazon Web Services (AWS)

• **Containerization:** Docker & Docker Compose

---

### **📁 Project Structure**

```
QuizAI/
├─ QuizAI_frontend/        # Chrome Extension (React)
├─ frontend_web/           # Web App Frontend (React + Nginx)
├─ QuizAI_backend/         # Backend API (Express + MongoDB)
├─ docker-compose.yml      # Multi-service Docker configuration
```

---

### **🚀 Run the Full App with Docker (Recommended)**

This is the easiest and most reliable way to run the entire app without setting up Node or dependencies manually.

### **🧩 Steps:**

1. **Clone the repository**

```
git clone https://github.com/Epiphany625/QuizAI.git
cd QuizAI
```

2. **Set up environment variables**

Create a .env file inside the QuizAI_backend/ folder:

```
GOOGLE_AI_KEY=your_google_ai_api_key
MONGO_URI=your_mongo_connection_uri
```

3. **Start all services (frontend, backend, extension build)**

```
docker compose up --build
```

4. **Access the app**

• Web App: [http://localhost:5173](http://localhost:5173/)

• API Server: http://localhost:3000/api

5. **Load the Chrome Extension**

• Open Chrome and go to chrome://extensions

• Enable “Developer mode”

• Click “Load unpacked”

• Select the QuizAI_frontend/dist/ folder (after it’s built by Docker or manually)

6. **Stop all containers**

```
docker compose down
```

---

**🧪 Run Locally (for development)**

If you prefer running each module separately:

**Chrome Extension**

```
cd QuizAI_frontend
npm install
npm run dev
```

**Web App**

```
cd frontend_web
npm install
npm run dev
```

**Backend**

```
cd QuizAI_backend
npm install
# Create a .env file as shown above
node server.js
```

---

### **✅ Contribution Guidelines**

• **Branching:** Create a new branch for each feature or fix.

• **Pull Requests:** Submit a PR after completing and testing your changes.

• **Code Reviews:** Collaborators will review and approve before merging.

---

### **👥 Collaborators**

• **Xinyang Xu**

• **Minyu Huang**

• **Haipeng Wu**

---

🎉 Happy quizzing!

Feel free to open an issue or reach out if you need help getting started.
