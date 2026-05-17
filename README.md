# Project Report: CampusShare (NourishElite)
## Food Surplus Management & Redistribution Platform

![Home Page View](file:///C:/Users/svgpr/.gemini/antigravity/brain/26ab13bc-17b9-49b5-b7e4-d665c4bdcd73/project_homepage_1777222962975.png)

### 1. Introduction & Objective
**CampusShare** (also designated as NourishElite) is a smart surplus food redistribution platform aimed at reducing food waste and nourishing communities. The core objective of the project is to connect individuals, restaurants, or campus facilities that have excess usable food with NGOs, students, or staff who can utilize it. By digitizing this supply chain, the platform ensures that surplus meals reach those in need rather than ending up in landfills, thus serving a critical environmental and social goal.

### 2. What This Project Does (Features)
The project provides an intuitive end-to-end web application that manages the full cycle of food donation and claiming.

*   **Role-Based User Ecosystem:** It accommodates Student, Staff, NGO, and Provider roles.
*   **Surplus Food Listing:** Providers can seamlessly list surplus meals with descriptive details, estimated quantity, freshness status, expiry timeline, and images. 
*   **Live Food Discovery & Claiming:** Users/NGOs can browse available food near them via the platform in real-time, validating the remaining quantities before claiming an item.
*   **Event Management & AI Summaries:** Users can create and promote food drives or volunteer training events. The platform leverages Google's Gemini AI under the hood to automatically generate concise and compelling descriptions/summaries for these events.
*   **Real-time Expiry Tracking:** A built-in automated chron-job process monitors the listing databases and dynamically removes any food listings that have crossed their expiration timelines.

![Events Page View](file:///C:/Users/svgpr/.gemini/antigravity/brain/26ab13bc-17b9-49b5-b7e4-d665c4bdcd73/events_page_loaded_1777223020666.png)

### 3. What Things Have Been Done Till Now (Current Implementation)
Substantial progress has been made across the full technology stack. The following technical milestones have been implemented successfully:

#### **Frontend (UI/UX)**
- Built a highly responsive and aesthetically refined interface (`/public`) using raw HTML, CSS (Glassmorphism & Gradients), and minimal JavaScript.
- Deployed dynamic functional pages: 
    - `index.html` (Impact Dashboard & Recent Donations)
    - `availablefood.html` (Food Listing Directory)
    - `addsurplus.html` (Forms for Providers)
    - `login.html` & `register.html` (User Onboarding)

#### **Backend (Node.js & Express.js)**
- **Authentication:** Integrated JSON Web Tokens (JWT) and Bcrypt hashing to secure login/registration workflows (`authController.js`). Authorized route guard middleware is operational.
- **REST APIs:** Structured robust API endpoints for Auth (`/api/auth`), Food handling (`/api/food`), and Event management (`/api/events`).
- **File Uploads System:** Operational `multer` image processing pipeline allowing users to attach up to 5 images per food listing securely to local server folders.
- **AI Integration Verification:** Implemented and authenticated the Google Generative AI (Gemini Flash Model) connection within `eventController.js`. It intercepts new event creations and generates automated contextual summaries behind the scenes before hitting the database.

#### **Database (MongoDB & Mongoose)**
- Provisioned the Cloud MongoDB Atlas Cluster and successfully linked to local environments using Environment Variables (`MONGO_URI`).
- Finalized MongoDB schemas for **User**, **Food** (with claiming and soft-delete states), and **Event**.

#### **Automation (Cron Job)**
- Configured Node-cron mapping logic (`cron/expireFood.js`) structured to cycle per minute seeking out and deleting expired provisions dynamically ensuring high-quality, safe listings are prioritized to end-users.

### 4. Technology Stack Utilized
*   **Frontend:** HTML5, Modern CSS, Vanilla JavaScript
*   **Backend Application:** Node.js, Express.js
*   **Database:** MongoDB, Mongoose ORM
*   **Intelligence:** Google Gemini AI Model
*   **Utilities:** JWT (Auth), Bcrypt (Security), Node-Cron (Job Automation), Multer (File Handling)

---
*End of Report Document.*
