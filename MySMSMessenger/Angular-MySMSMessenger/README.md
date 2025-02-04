# **MySMS Messenger - Angular FrontEnd**

## **Overview**

**MySMS Messenger - Frontend** is a **React** application designed to offer a seamless user experience for managing SMS messages through the **Twilio API**. The frontend allows users to securely sign up, log in, send messages, and view their message history. The app is built using **Angular**, and interacts with a **Ruby on Rails backend** to facilitate communication with the **Twilio API** and store message data in **MongoDB**.

- **Frontend Role**: The React frontend serves as the user interface that interacts with the backend API. It provides the components that allow users to register, log in, send messages, and view sent messages. It uses **JWT** tokens for secure session management and communicates with the backend for all data transactions.
- **Twilio Integration**: The **Twilio API** enables the app to send SMS messages. The frontend gathers user input, including message content and recipient phone number, and passes it to the backend. The backend handles communication with **Twilio**, ensuring the messages are sent to the desired recipients.
- **Message History**: Users can view their message history, which is stored in **MongoDB**. The frontend fetches and displays sent messages, including the recipient’s phone number, message content, timestamp, and character count.

---

## **Key Features**

### **User Authentication**  
- **JWT-based Authentication**: The frontend uses JWT tokens for user authentication. When a user logs in, the app stores a **JWT token** in **localStorage**, which is used for authenticating future API requests. The token allows users to access protected routes like sending messages and viewing their message history.

### **Message Sending**  
- **Twilio SMS Integration**: Users can send SMS messages by entering the recipient’s phone number and the message content into the form on the frontend. The frontend passes this data to the backend, which communicates with **Twilio** to send the message.  
- **Session Management**: The **SessionService** (shown above) manages user sessions by storing and retrieving session data from **localStorage**. It ensures that the user’s login status is maintained across page reloads.

### **Message History**  
- The frontend allows users to view all messages they’ve sent, which are retrieved from the **MongoDB database** via the backend. The **RubyApiService** fetches this data by calling the backend’s API endpoints and presents it to the user in an organized manner, showing the phone number, timestamp, and content of each message.
  
### **Responsive Design**  
- The application is fully responsive, ensuring that it works seamlessly on both desktop and mobile devices. Whether users are composing a new message or browsing their message history, the UI adapts to different screen sizes.

### **Advanced Features in Service Layer**  
- **Caching**: The `RubyApiService` implements caching for API calls, enhancing performance by reducing redundant requests to the backend. The **CacheService** is used to store data like messages and user details, and the data is refreshed in the background when necessary.  
- **Error Handling and Retries**: The frontend makes use of robust error handling mechanisms, ensuring that failed requests are retried a set number of times. In case of errors, the app provides meaningful error messages to users. 

---
Great! Now let's move on to the next two topics:  

- **Project Structure**  
- **Getting Started**  

---

## **Project Structure**  

The **MySMS Messenger Frontend** follows a structured, modular approach to ensure maintainability and scalability. The project is organized into different folders to separate concerns like components, services, models, and assets. Below is the directory structure for the **Angular-based frontend**:

```
Angular-MySMSMessenger/
├── src/                                          # Source files for the Angular application
│   ├── app/                                      # Core application logic
│   │   ├── components/                           # Reusable UI components
│   │   │   ├── login-form/                       # Login component
│   │   │   │   ├── login-form.component.ts       # Logic for login
│   │   │   │   ├── login-form.component.html     # UI template for login
│   │   │   ├── signup-form/                      # Signup component
│   │   │   ├── message-form/                     # Form for composing SMS messages
│   │   │   ├── messages/                         # Component for displaying message history
│   │   │   ├── welcome/                          # Welcome screen component
│   │   ├── services/                             # Services for handling API calls, caching, and authentication
│   │   │   ├── session.service.ts                # Manages user session (login/logout)
│   │   │   ├── ruby-api.service.ts               # Handles API calls to the backend
│   │   │   ├── cache.service.ts                  # Caches frequently accessed API data
│   │   │   ├── shared.service.ts                 # Shared service for triggering UI updates
│   │   ├── models/                               # Data models used in the app
│   │   │   ├── user.ts                           # User model definition
│   │   │   ├── message.ts                        # Message model definition
│   │   ├── app-routing.module.ts                 # Defines frontend routing
│   │   ├── app.component.ts                      # Root component
│   │   ├── app.module.ts                         # Main application module
│   ├── assets/                                   # Static assets (images, icons, styles)
│   ├── index.html                                # Main HTML file for rendering the app
│   ├── styles.css                                # Global styles and themes
├── .dockerignore                                 # Specifies files to ignore in Docker builds
├── package.json                                  # Project dependencies and scripts
├── README.md                                     # Documentation for the frontend
```

Got it! Let's expand the **Key Components & Services** section with detailed explanations for each major part of the frontend, excluding the diagram.

---

## **Key Components & Services**

The **MySMS Messenger Frontend** is structured into modular components and services that work together to provide a seamless user experience. This section covers the main components responsible for handling UI, API calls, authentication, caching, and state management.

### **1. Components (UI & User Interaction)**  

The application consists of multiple **reusable components** that handle different parts of the user interface.

#### **Authentication Components**  
- **Login Form (`login-form`)**  
  - Allows users to enter their credentials (username and password).  
  - On successful login, it stores the **JWT token** in **SessionService**.  
  - Redirects the user to the main dashboard upon authentication.  

- **Signup Form (`signup-form`)**  
  - Enables users to register by providing necessary details.  
  - Sends user data to the backend for account creation.  

#### **Messaging Components**  
- **Message Form (`message-form`)**  
  - Provides an input field for users to enter SMS content and the recipient's phone number.  
  - Calls `RubyApiService.createMessage()` to send the data to the backend.  
  - Displays success or error messages based on the API response.  

- **Message History (`messages`)**  
  - Fetches and displays the list of previously sent messages.  
  - Retrieves data using `RubyApiService.readMessages()`.  
  - Displays key details such as **recipient phone number, timestamp, and message content**.  

#### **Navigation & Utility Components**  
- **Welcome Screen (`welcome`)**  
  - Displays a greeting message and directs users to login or signup.  

- **Shared Components**  
  - Common UI elements (buttons, alerts, modals) are centralized for reusability.  

---

### **2. Services (Handling API, Sessions, and Caching)**  

Services handle **data retrieval, API communication, caching, and session management** to ensure a smooth user experience.

#### **Session Management (`SessionService`)**  
- Manages user authentication and session persistence.  
- Stores user data (JWT token, username hash) in **localStorage**.  
- Provides methods:  
  - `setSessionData(user: User)`: Saves user session.  
  - `getSessionData()`: Retrieves session details.  
  - `hasSessionData()`: Checks if a user is logged in.  
  - `clearSessionData()`: Logs the user out by clearing session storage.  

#### **API Communication (`RubyApiService`)**  
- Handles all **HTTP requests** between the frontend and backend.  
- Implements:  
  - **Retry mechanism**: Automatically retries failed requests up to `2` times.  
  - **Error handling**: Uses `catchError()` to gracefully handle failures.  
  - **Caching**: Works with `CacheService` to store API responses.  
- Key methods:  
  - `readMessages()`: Fetches all messages for the logged-in user.  
  - `readMessagesByUsernameHash(usernameHash: string)`: Retrieves messages for a specific user.  
  - `createMessage(message: Message)`: Sends a new SMS message.  
  - `deleteMessagesByUsernameHash(usernameHash: string)`: Deletes all messages of a user.  

#### **Data Caching (`CacheService`)**  
- Stores frequently requested API responses in **localStorage** to reduce redundant API calls and improve performance.  
- Enforces a **cache limit of 50 items** and removes the oldest entry when full.  
- Methods:  
  - `get(key: string)`: Retrieves cached data by key.  
  - `set(key: string, value: any)`: Saves data in the cache.  
  - `clear()`: Clears all cached data.  
- Used in **RubyApiService** to cache API responses, ensuring a faster user experience.

#### **State Management (`SharedService`)**  
- Provides a **centralized event emitter** for triggering UI updates.  
- Used for refreshing components after data updates (e.g., when new messages are sent).  
- Helps maintain real-time UI consistency across different components.

---

## **Running the Application**  

The **MySMS Messenger Frontend** can be run using **Docker Compose** (recommended) or manually with **npm**. This section provides instructions for both methods, along with troubleshooting tips.

---

### **Method 1: Using Docker (Recommended)**  

Running the frontend with **Docker** ensures that all dependencies and configurations are properly handled without requiring manual setup.

#### **Steps to Run with Docker**  

1. **Ensure Docker is installed** on your system.  
   - If you haven’t installed Docker, download it from [Docker's official website](https://www.docker.com/get-started).  

2. **Navigate to the project directory**:  
   ```bash
   cd mysmsmessenger
   ```

3. **Start the frontend service using Docker Compose**:  
   ```bash
   docker-compose up frontend
   ```
   - This will:
     - Build the **Angular frontend** inside a container.
     - Expose port `4200` so the app is accessible in the browser.
     - Ensure it runs in an isolated environment without affecting system-wide dependencies.

4. **Access the application** in a browser:  
   - Open: [http://localhost:4200](http://localhost:4200)  

#### **Stopping the Application**  
To stop the running containers, press **CTRL + C** in the terminal.  
Alternatively, to stop all services and remove associated containers, run:  
```bash
docker-compose down
```

#### **Rebuilding the Container**  
If you’ve made updates to the frontend code and need to apply them in Docker, rebuild the container using:  
```bash
docker-compose up --build frontend
```

---

### **Method 2: Running Manually (Without Docker)**  

If you prefer to run the frontend **without Docker**, follow these steps.

#### **1. Install Dependencies**  
Navigate to the frontend directory and install required dependencies:  
```bash
cd Angular-MySMSMessenger
npm install
```
This will install all necessary **Node.js packages** for the project.

#### **2. Start the Development Server**  
Run the following command:  
```bash
npm start
```
- This will:
  - Start the **Angular development server**.
  - Automatically compile and reload changes when the source code is modified.
  - By default, the server runs on **port 4200**.

#### **3. Open the Application**  
Once the server is running, open a browser and go to:  
[http://localhost:4200](http://localhost:4200)

#### **4. Stopping the Server**  
To stop the server, press **CTRL + C** in the terminal.

---

## **Troubleshooting Common Issues**  

| Issue | Cause | Solution |
|--------|--------|------------|
| **Port 4200 is already in use** | Another process is running on the same port | Run `npm start -- --port=4300` to use a different port |
| **Module not found / Dependency errors** | Missing `node_modules` folder or incorrect package versions | Run `npm install` again to reinstall dependencies |
| **Changes are not reflected in the UI** | Angular’s live reload is not working properly | Restart the server with `npm start` |
| **Docker container fails to start** | Issues with cached builds | Try `docker-compose up --build frontend` |

---

## **Running the Application in Production**  

For a **production** deployment, the frontend should be built into static files and served by a web server.

### **Steps to Build for Production**  

1. **Generate an optimized build**:  
   ```bash
   npm run build
   ```
   - This creates a `dist/` folder containing minified static files.

2. **Serve the app using a web server (e.g., Nginx)**:  
   - A production-ready server (e.g., **Nginx, Apache, or AWS S3**) should be used to serve the static files.

3. **Deploy the built files to the hosting environment**.  

## Contact Me

- Email: code.mait@gmail.com
- [LinkedIn](https://www.linkedin.com)
- [GitHub](https://www.github.com)