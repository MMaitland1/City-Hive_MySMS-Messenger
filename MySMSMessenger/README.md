# **MySMS Messenger**

## **Overview**

**MySMS Messenger** is a full-stack application that allows users to send and manage SMS messages through the **Twilio API**. It combines a **React frontend** with a **Ruby on Rails backend**, storing data in a **MongoDB** database. The application is designed to be user-friendly, secure, and responsive, enabling users to easily send messages and view their message history.

### **Key Features**
- **User Authentication**: Users can sign up, log in, and securely manage their sessions using **JWT tokens** for authentication.
- **Message Sending**: Users can send SMS messages using the **Twilio API**. The app allows users to input message content and send it to a phone number.
- **Message History**: The app allows users to view previously sent messages stored in **MongoDB**, including details like content, timestamp, and phone number.
- **Twilio Integration**: The app integrates with Twilio for SMS functionality, ensuring reliable message delivery.
- **Frontend and Backend Separation**: The app’s frontend (React) communicates with the backend (Ruby on Rails) via **RESTful API calls**.

## **Technology Stack**

### **Frontend:**
- **React** (for the user interface)
- **React Router** (for client-side routing)
- **Axios** (for making HTTP requests to the backend API)
- **JWT Authentication** (for securing user sessions)
- **Jest** and **React Testing Library** (for testing the frontend components)

### **Backend:**
- **Ruby on Rails** (for the API and backend services)
- **Twilio** (for sending SMS messages)
- **MongoDB** (for data storage)
- **JWT** (for authenticating user sessions)
- **Swagger** (for API documentation)

### **Additional Tools:**
- **Docker Compose** (for containerized deployment of frontend, backend, and MongoDB)
- **dotenv** (for managing environment variables)
Great! Let's continue with the next two topics.

## **Project Structure**

The **MySMS Messenger** project is structured in a way that separates the frontend, backend, and database logic, making it modular and scalable. Below is a detailed breakdown of the structure of both the **React frontend** and the **Ruby on Rails backend**.

```
MySMSMessenger/
├── Angular-MySMSMessenger/                          # Front-end (Angular)
│   ├── src/                                         # Source files for Angular
│   │   ├── app/                                     # Angular app
│   │   │   ├── components/                          # Reusable Angular components
│   │   │   │   ├── display/                         # Display component
│   │   │   │   │   ├── display.component.ts         # Display component logic
│   │   │   │   │   ├── display.component.html       # Display component template
│   │   │   │   ├── login-form/                      # Login form component
│   │   │   │   │   ├── login-form.component.ts      # Login form logic
│   │   │   │   │   ├── login-form.component.html    # Login form template
│   │   │   │   ├── message-form/                    # Message form component
│   │   │   │   │   ├── message-form.component.ts    # Message form logic
│   │   │   │   │   ├── message-form.component.html  # Message form template
│   │   │   │   ├── messages/                        # Messages display component
│   │   │   │   │   ├── messages.component.ts        # Messages component logic
│   │   │   │   │   ├── messages.component.html      # Messages component template
│   │   │   │   ├── signup-form/                     # Signup form component
│   │   │   │   │   ├── signup-form.component.ts     # Signup form logic
│   │   │   │   │   ├── signup-form.component.html   # Signup form template
│   │   │   │   └── welcome/                         # Welcome screen component
│   │   │   │       ├── welcome.component.ts         # Welcome component logic
│   │   │   │       ├── welcome.component.html       # Welcome component template
│   │   │   ├── services/                            # Angular services
│   │   │   │   ├── auth.guard.ts                    # Guard for authentication
│   │   │   │   ├── ruby-api.service.ts              # Service to interact with Ruby backend API
│   │   │   │   ├── session.service.ts               # Session management service
│   │   │   │   └── shared.service.ts                # Shared service for reusable methods
│   │   │   ├── models/                              # Angular models
│   │   │   │   ├── Message.ts                       # Message model
│   │   │   │   ├── User.ts                          # User model
│   │   │   ├── app-routing.module.ts                # Routing configuration
│   │   │   ├── app.component.ts                     # Root component
│   │   │   ├── app.module.ts                        # Main Angular module
│   │   ├── assets/                                  # Static assets
│   │   ├── index.html                               # Main HTML file
│   │   ├── styles.css                               # Global styles
├── Ruby-MySMSMessenger/                             # Back-end (Ruby on Rails)
│   ├── app/                                         # Rails application
│   │   ├── controllers/                             # Rails controllers
│   │   │   ├── application_controller.rb            # Base controller
│   │   │   ├── home_controller.rb                   # Home controller
│   │   │   ├── messages_controller.rb               # Messages controller
│   │   │   ├── users_controller.rb                  # Users controller
│   │   ├── models/                                  # Rails models
│   │   │   ├── message.rb                           # Message model
│   │   │   ├── user.rb                              # User model
│   │   ├── services/                                # Services
│   │   │   └── twilio_service.rb                    # Twilio service for SMS handling
│   │   ├── views/                                   # Rails views
│   │   ├── config/                                  # Rails configuration
│   │   │   ├── environments/                        # Environment-specific configurations
│   │   │   │   ├── development.rb                   # Development environment config
│   │   │   │   ├── production.rb                    # Production environment config
│   │   │   │   ├── test.rb                          # Test environment config
│   │   │   ├── routes.rb                            # Routes configuration
├── .dockerignore                                     # Docker ignore file
├── docker-compose.yml                               # Docker Compose configuration
├── Gemfile                                           # Ruby project dependencies
├── Gemfile.lock                                      # Lock file for Ruby dependencies
└── README.md                                         # Project documentation

```

---

## **Getting Started**

Here are the steps to get the **MySMS Messenger** application up and running locally. This includes setting up both the **frontend** (React) and the **backend** (Rails) environments, as well as configuring the **database** and any required **API keys**.

### **Prerequisites**

Before you start, ensure the following are installed on your machine:
- **Node.js** (version >= 12.x recommended)
- **npm** (Node Package Manager)
- **Ruby** (for the Rails backend)
- **MongoDB** (or use Docker for MongoDB container)

### **Installation**

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   ```

2. **Frontend Setup**:
   Navigate to the frontend directory and install dependencies:
   ```bash
   cd Angular-MySMSMessenger
   npm install
   ```

3. **Backend Setup**:
   Navigate to the backend directory and install Ruby dependencies:
   ```bash
   cd Ruby-MySMSMessenger
   bundle install
   ```

4. **Database Setup**:
   Ensure **MongoDB** is running, or use **Docker** to run MongoDB in a container. If using Docker, follow the steps below to set up the database.

Absolutely! Let's dive deeper into these topics with more detailed explanations:

---

## **Running the Applications**

Running **MySMS Messenger** involves starting both the **frontend** (React), the **backend** (Ruby on Rails), and the **MongoDB** database. The recommended way to manage these services is through **Docker Compose**, which simplifies the process by using a single configuration to manage multiple services.

### **Method 1: Using Docker Compose**

With **Docker Compose**, you can easily manage and orchestrate multiple containers. This method handles both the frontend, backend, and database in isolated containers. Here's how to set it up:

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the project directory**:
   ```bash
   cd mysmsmessenger
   ```

3. **Build and start the containers**:
   Run the following command to build and start all the services defined in your `docker-compose.yml` file.
   ```bash
   docker-compose up
   ```

   This will:
   - **Build Docker images** for the **React frontend** and **Rails backend**.
   - **Run MongoDB** as a containerized database.
   - **Expose the following ports**:
     - **Frontend**: Accessible at [http://localhost:4200](http://localhost:4200) (React app)
     - **Backend**: Accessible at [http://localhost:3000](http://localhost:3000) (Rails API)
     - **MongoDB**: Running as a service in the background, accessible by the backend via `mongo:27017`.

4. **Access the application**:
   - Open your browser and navigate to the frontend at [http://localhost:4200](http://localhost:4200). This will bring up the app's UI, where you can log in, send messages, and view message history.
   
5. **Stop the services**:
   To stop the services, press `CTRL + C` in your terminal, and Docker Compose will gracefully shut down the containers.

### **Method 2: Manual Setup (Non-Dockerized)**

If you prefer to run the services **manually** without Docker, follow these steps. This allows you to have more control over each individual service but requires managing dependencies for each one.

1. **Frontend (React)**:
   - In the `Angular-MySMSMessenger` folder, install dependencies and start the React app:
     ```bash
     cd Angular-MySMSMessenger
     npm install
     npm start
     ```

     This will start the frontend development server, and the React app will be available at [http://localhost:4200](http://localhost:4200).

2. **Backend (Ruby on Rails)**:
   - First, make sure **Ruby** and **Rails** are installed on your machine. If you're using **Bundler** (which is recommended for Rails projects), follow these steps:
     ```bash
     cd Ruby-MySMSMessenger
     bundle install
     rails db:create  # Create the database (MongoDB in this case)
     rails server
     ```

     The backend will now be running at [http://localhost:3000](http://localhost:3000). The API will handle requests from the frontend for user authentication, sending messages, and retrieving message history.

3. **MongoDB**:
   - If you're not using Docker to manage MongoDB, ensure that MongoDB is running on your local machine or set it up with Docker:
     ```bash
     docker run -d -p 27017:27017 --name mongo mongo:latest
     ```

     MongoDB will now be running on `localhost:27017`. The backend will communicate with MongoDB via this URI to store and retrieve messages.
---

## **Environment Variables**

The **backend** of the application relies on several external services, such as **Twilio** for sending SMS and **MongoDB** for storing messages. These services require **environment variables** to securely handle sensitive data like API keys, database URIs, and authentication tokens.

### **Setting Up Environment Variables for the Backend**

1. **Create a `.env` file** in the `Ruby-MySMSMessenger` directory. This file will store your environment variables and help you manage configuration values outside of the codebase.

2. **Add environment variables to the `.env` file**:
   
   Here’s an example `.env` file for the **Twilio** API and **MongoDB** configuration:

   ```
   # Twilio API credentials
   TWILIO_ACCOUNT_SID=your_account_sid
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_phone_number

   # MongoDB connection URI
   MONGO_URI=mongodb://mongo:27017/mysmsmessenger
   ```

   - **TWILIO_ACCOUNT_SID**: Your unique Twilio account SID, available from the Twilio console.
   - **TWILIO_AUTH_TOKEN**: Your Twilio authentication token, also available in your Twilio console.
   - **TWILIO_PHONE_NUMBER**: The Twilio phone number you’ll use to send SMS messages.
   - **MONGO_URI**: The URI pointing to your MongoDB instance. If you’re using Docker Compose, it should be `mongodb://mongo:27017/mysmsmessenger`. If running MongoDB locally, you might use `mongodb://localhost:27017/mysmsmessenger`.

3. **Environment Variables for API Keys**:
   - It’s critical that **Twilio credentials** are stored securely and not hardcoded into your source code.
   - The **MongoDB URI** points to the database service that your Rails backend will use to store messages.

4. **Ensure `.env` is added to `.gitignore`**:
   To avoid accidentally sharing sensitive information, add the `.env` file to your `.gitignore` file. This ensures that sensitive keys don’t get pushed to version control systems like GitHub.

   Example `.gitignore`:
   ```
   .env
   ```

5. **Accessing Environment Variables in Rails**:
   - In your **Rails application**, you can access these environment variables using `ENV['VARIABLE_NAME']`.

   Example usage in the backend:
   ```ruby
   # Accessing Twilio API credentials
   account_sid = ENV['TWILIO_ACCOUNT_SID']
   auth_token = ENV['TWILIO_AUTH_TOKEN']
   phone_number = ENV['TWILIO_PHONE_NUMBER']

   # Accessing MongoDB URI
   mongo_uri = ENV['MONGO_URI']
   ```

---

## **Available Routes**

In **MySMS Messenger**, both the **frontend** and **backend** play key roles in routing and managing user interactions. The **backend** (Ruby on Rails) handles API routes for user management, message creation, and retrieval, while the **frontend** (React) handles navigation between different views of the application.

### **Backend Routes**

The backend exposes a set of API endpoints for handling user authentication and message-related operations. Here’s a deeper dive into each API route:

#### **User Authentication Routes**

1. **POST `/createUser`** - Create a new user
   - **Description**: This endpoint allows for creating a new user. It accepts a **username** and **password** and stores the user information in the database.
   - **Request Body**:
     ```json
     {
       "username": "user123",
       "password": "password123"
     }
     ```
   - **Response**:
     - **201 Created**: User created successfully.
     - **400 Bad Request**: Missing or invalid input (e.g., empty fields).
   
2. **POST `/login`** - Authenticate a user and return a JWT token
   - **Description**: This endpoint authenticates a user based on their username and password. If valid, it returns a **JWT token** to be used for authenticated API requests.
   - **Request Body**:
     ```json
     {
       "username": "user123",
       "password": "password123"
     }
     ```
   - **Response**:
     - **200 OK**: Returns a JWT token for authentication.
     - **401 Unauthorized**: Invalid username or password.

#### **Message Routes**

1. **POST `/createMessage`** - Create and send a new SMS message
   - **Description**: This endpoint allows users to send an SMS message through the **Twilio API**. The message content and recipient phone number are sent in the request body.
   - **Request Body**:
     ```json
     {
       "to": "+1234567890",
       "body": "Hello, this is a test message"
     }
     ```
   - **Response**:
     - **201 Created**: Message successfully created and sent.
     - **400 Bad Request**: Missing required parameters (e.g., missing "to" or "body").

2. **GET `/readMessages`** - Retrieve all messages sent by the authenticated user
   - **Description**: This endpoint retrieves all messages sent by the logged-in user. Only users with valid **JWT tokens** can access this route.
   - **Response**:
     - **200 OK**: Returns an array of message objects.
     - **401 Unauthorized**: If the user is not authenticated.
   
3. **GET `/readMessages/:username_hash`** - Retrieve all messages for a specific user
   - **Description**: This endpoint fetches all messages for a user identified by their `username_hash`. This route is accessible to admins or users who know the hash of another user.
   - **Response**:
     - **200 OK**: Returns an array of messages for the specified user.
     - **404 Not Found**: If the user does not exist.

4. **DELETE `/deleteMessages/:username_hash`** - Delete all messages for a specific user
   - **Description**: This endpoint allows a user or admin to delete all messages associated with a particular user.
   - **Response**:
     - **200 OK**: Successfully deleted messages for the specified user.
     - **404 Not Found**: If the user does not exist or no messages are found.

---

### **Frontend Routes**

The **React frontend** manages navigation between various pages of the application. It uses **React Router** for handling client-side routing and ensures users can easily navigate between the login page, message form, and message history.

Here’s a breakdown of the frontend routes:

1. **`/`** - Home page (Welcome screen)
   - **Description**: The home page is the first screen users see when they open the app. It typically contains a welcome message or prompts users to log in or sign up.
   - **Access**: Accessible to all users (no authentication required).

2. **`/login`** - Login page
   - **Description**: This page allows users to log in by providing their **username** and **password**. Upon successful login, a **JWT token** is stored in the frontend, enabling the user to interact with protected routes.
   - **Access**: Accessible to all users (no authentication required).

3. **`/signup`** - Signup page
   - **Description**: This page allows users to create a new account by providing a **username** and **password**. Upon successful signup, the user is automatically logged in.
   - **Access**: Accessible to all users (no authentication required).

4. **`/message`** - Message form page
   - **Description**: The message form page allows authenticated users to send SMS messages. The user can input the recipient’s phone number and message content.
   - **Access**: Protected route—users must be logged in to access this page. Access is granted via the **AuthGuard**.

5. **`/messageHistory`** - Message history page
   - **Description**: This page displays a list of all messages the logged-in user has sent, showing details such as the recipient's phone number, message content, timestamp, and character count.
   - **Access**: Protected route—only accessible by authenticated users.

6. **`/search`** - Search results page
   - **Description**: This page allows users to search for previous messages or contacts (if such functionality is implemented).
   - **Access**: Protected route—users must be logged in to access this page.

---

### **Protected Routes and AuthGuard**

The **AuthGuard** is a feature of the **React Router** that protects certain routes (like `/message` and `/messageHistory`). It checks if the user is authenticated by verifying the **JWT token** stored in **localStorage**. If the user is authenticated, they are allowed access to these routes. If not, they are redirected to the **login page**.

For example:
- **Route `/message`** (sending SMS) is only accessible to users who are logged in.
- **Route `/messageHistory`** (viewing sent messages) is also protected and requires the user to be authenticated.

Thank you for sharing the **User model** code! Here's a detailed breakdown of how this **User model** fits into the structure of the app:

---
Great! Let's move on to the next two topics:

---

## **Database Structure**

In **MySMS Messenger**, the backend uses **MongoDB** to store and manage the application's data. MongoDB is a NoSQL database that stores data in a flexible, JSON-like format called **documents**. The main collections in the database are for **users** and **messages**.

### **Message Model (Mongoid)**

The **Message model** is responsible for storing details of each SMS message that a user sends. This model is built using **Mongoid**, an Object-Document Mapper (ODM) for MongoDB in Ruby, making it easy to interact with the MongoDB database.

```ruby
class Message
  include Mongoid::Document

  store_in client: 'messages'  # Specifies which MongoDB collection to store this document

  field :usernameHash, type: String    # Unique identifier for the user sending the message
  field :charCount, type: Integer      # The number of characters in the message content
  field :content, type: String         # The content of the SMS message
  field :phoneNumber, type: String     # The phone number to which the message was sent
  field :timestamp, type: String       # Timestamp of when the message was sent
end
```

#### **Field Explanations**:
- **`usernameHash`**: This stores the unique identifier for the user who sent the message, likely hashed to ensure privacy. It is used to associate messages with a specific user.
- **`charCount`**: This stores the number of characters in the message, useful for managing SMS limits (Twilio has limits on message length).
- **`content`**: This is the body of the SMS message that was sent.
- **`phoneNumber`**: The recipient’s phone number. This is used to send the message through the Twilio API.
- **`timestamp`**: The date and time when the message was created, which helps in displaying the order of messages in the app.

Each document (message) is stored in the **`messages`** collection in MongoDB.

**User Model (Mongoid)**

The **User model** is responsible for storing user-specific data in the **MongoDB database**. This model is particularly important for managing user authentication and identifying users uniquely through their **`usernameHash`**.

#### **Model Definition**

```ruby
class User
  # Include Mongoid document capabilities
  include Mongoid::Document

  # Specify the MongoDB client/database for user storage
  store_in client: 'users'

  # Unique identifier for the user, stored as a hash
  field :usernameHash, type: String
end
```
### **Field Explanation:**
- **`usernameHash`**:  
  This field is a unique identifier for each user, stored as a **hashed string**. Instead of storing plain text usernames, we store their hashed versions for **security reasons** (such as protecting user privacy). The **`usernameHash`** can be used to associate messages, sent by a user, with their account.
  
  **Why hash the username?**
  - Hashing provides a layer of security by not storing sensitive data (e.g., username or email) in a directly readable form.
  - It helps in ensuring that even if the database is compromised, the original user identifiers cannot be easily recovered.

### **How It Fits Into the System**

#### **User Authentication:**
- When a user logs in or signs up, the backend (Ruby on Rails) will use the `usernameHash` to identify the user.
- The **hashed username** is typically generated by hashing the actual username with a secure algorithm like **SHA256** or **bcrypt**, making it easier to match user input during authentication without exposing the original username.

#### **Storing User Data:**
- The `usernameHash` field is saved to the **`users`** collection in MongoDB, as defined by the `store_in client: 'users'` line in the model.
- This **collection** holds all the user-specific data, making it easy to query and retrieve user-related information when needed (e.g., for displaying message history, authenticating users, etc.).

## **Docker Setup**

**Docker** is used to containerize the application, making it easy to deploy, manage, and scale. The app uses **Docker Compose** to manage multiple containers: one for the **React frontend**, one for the **Rails backend**, and one for **MongoDB**.

### **docker-compose.yml**

Here is the structure of the **docker-compose.yml** file that defines the services used by the app:

```yaml
version: '3'
services:
  frontend:
    build:
      context: ./Angular-MySMSMessenger
    ports:
      - "4200:4200"
    networks:
      - mynetwork
    env_file:
      - .env

  backend:
    build:
      context: ./Ruby-MySMSMessenger
    ports:
      - "3000:3000"
    networks:
      - mynetwork
    env_file:
      - .env

  mongo:
    image: mongo:latest
    container_name: mongo
    ports:
      - "27017:27017"
    networks:
      - mynetwork

networks:
  mynetwork:
    driver: bridge
```

### **Service Breakdown**:
1. **frontend**:
   - **Build**: This service builds the **React frontend** using the Dockerfile in the `Angular-MySMSMessenger` directory.
   - **Ports**: Exposes port `4200` to the host, allowing you to access the frontend on [http://localhost:4200](http://localhost:4200).
   - **Environment Variables**: Loads environment variables from a `.env` file for configuration (like API URLs).
   
2. **backend**:
   - **Build**: Builds the **Ruby on Rails backend** using the Dockerfile in the `Ruby-MySMSMessenger` directory.
   - **Ports**: Exposes port `3000` to the host, allowing you to access the backend API on [http://localhost:3000](http://localhost:3000).
   - **Environment Variables**: Loads environment variables from a `.env` file (including **Twilio API credentials** and **MongoDB URI**).
   
3. **mongo**:
   - **Image**: Uses the official **MongoDB** Docker image to run MongoDB.
   - **Ports**: Exposes MongoDB's default port `27017` to the host for database interaction.
   
4. **Networks**:
   - All services are connected via the `mynetwork` network, enabling seamless communication between the containers.


### **Mongoid's Role in the Application**

- **Mongoid** makes it easy to map **Ruby classes** to **MongoDB documents**, allowing Rails to interact with the **MongoDB database** just as easily as it would with a traditional relational database.
- With **Mongoid::Document**, the `User` model becomes a MongoDB document that can be persisted, queried, and updated in the `users` collection.

---

### **Example Usage in the Application**

#### **Creating a New User**
When a new user signs up, the **`usernameHash`** would be created, typically using a hash function:

```ruby
# Example of creating a new user with a hashed username
user = User.create(usernameHash: Digest::SHA256.hexdigest("username123"))
```

#### **Finding a User by `usernameHash`**
To find a user by their hashed username:

```ruby
user = User.find_by(usernameHash: Digest::SHA256.hexdigest("username123"))
```

This ensures that the user’s identity is verified via the **hashed identifier** rather than the raw username, enhancing security.

Great! Let's continue with the next topics:

---

## **Deployment**

Deploying **MySMS Messenger** involves taking the application from your local development environment to a **production environment**, where it can be accessed by users. The deployment process is simplified using **Docker Compose**, but it can also be done manually on services like **Heroku**, **AWS**, or **DigitalOcean**.

### **Docker Deployment**

Using **Docker** simplifies the deployment process by ensuring that the application works the same way on any machine, from development to production. Here’s how to deploy the app using **Docker Compose**.

1. **Docker Compose Setup**:
   The application’s **`docker-compose.yml`** file defines the services (frontend, backend, and MongoDB) and how they should run together. Here is the breakdown:

   ```yaml
   version: '3'
   services:
     frontend:
       build:
         context: ./Angular-MySMSMessenger
       ports:
         - "4200:4200"
       networks:
         - mynetwork
       env_file:
         - .env

     backend:
       build:
         context: ./Ruby-MySMSMessenger
       ports:
         - "3000:3000"
       networks:
         - mynetwork
       env_file:
         - .env

     mongo:
       image: mongo:latest
       container_name: mongo
       ports:
         - "27017:27017"
       networks:
         - mynetwork

   networks:
     mynetwork:
       driver: bridge
   ```

2. **Building and Running the Application**:
   After cloning the repository and setting up the `.env` file with necessary environment variables (e.g., **Twilio credentials**, **MongoDB URI**), you can deploy the application locally or to a cloud service:

   - Build and start all services:
     ```bash
     docker-compose up --build
     ```

   This will:
   - Build the **React frontend** and **Ruby on Rails backend** images.
   - Run the **MongoDB** container.
   - Expose **port 4200** for the frontend (accessible in your browser).
   - Expose **port 3000** for the backend (API server).

   - After running `docker-compose up`, the app will be accessible at:
     - **Frontend**: [http://localhost:4200](http://localhost:4200)
     - **Backend API**: [http://localhost:3000](http://localhost:3000)

---

## **Running Without Docker**

While **Docker** provides an easy way to run **MySMS Messenger** in isolated containers, you can also run the application without Docker by setting up each component individually. Here's a step-by-step guide to getting both the **React frontend** and **Ruby on Rails backend** running manually.

### **Prerequisites**

Before proceeding, ensure you have the following installed on your machine:

- **Node.js** (version >= 12.x recommended)
- **npm** (Node Package Manager)
- **Ruby** (for the backend)
- **Rails** (for the backend)
- **MongoDB** (for the database)
- **Twilio account** (for SMS functionality)

### **Step 1: Setup the Backend (Ruby on Rails)**

The backend is a **Ruby on Rails** API that communicates with the **Twilio API** to send SMS messages and **MongoDB** to store message data. To set up the backend, follow these steps:

#### **1.1 Install Ruby and Rails**
Ensure you have **Ruby** and **Rails** installed. You can install them using a version manager like **rvm** or **rbenv**. Here's how you can install them:

- **Install Ruby**:
  ```bash
  sudo apt-get install ruby-full
  ```

- **Install Rails**:
  ```bash
  gem install rails
  ```

#### **1.2 Install Project Dependencies**
Navigate to the `Ruby-MySMSMessenger` directory and install the required Ruby gems:

```bash
cd Ruby-MySMSMessenger
bundle install
```

This will install all the dependencies defined in the `Gemfile`.

#### **1.3 Setup MongoDB**
- Install **MongoDB** on your local machine or run it through **Docker**. If you don’t have it installed locally, you can run MongoDB in a container:

  ```bash
  docker run -d -p 27017:27017 --name mongo mongo:latest
  ```

- Ensure MongoDB is running at `mongodb://localhost:27017`.

#### **1.4 Configure Environment Variables**
Create a `.env` file in the `Ruby-MySMSMessenger` directory and add the following configuration:

```bash
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
MONGO_URI=mongodb://localhost:27017/mysmsmessenger
```

Replace `your_account_sid`, `your_auth_token`, and `your_twilio_phone_number` with the credentials from your **Twilio** account.

#### **1.5 Start the Rails Server**
Now, start the **Rails** API server:

```bash
rails server
```

This will start the backend API, and it will be available at [http://localhost:3000](http://localhost:3000).

---

### **Step 2: Setup the Frontend (React)**

The frontend is a **React** application that interacts with the **Rails backend** to send and retrieve messages.

#### **2.1 Install Node.js and npm**
Ensure you have **Node.js** (version >= 12.x) and **npm** installed. If not, you can install them using:

```bash
sudo apt-get install nodejs
sudo apt-get install npm
```

#### **2.2 Install Project Dependencies**
Navigate to the `Angular-MySMSMessenger` directory and install the required frontend dependencies:

```bash
cd Angular-MySMSMessenger
npm install
```

#### **2.3 Start the React Development Server**
To run the frontend locally, use the following command:

```bash
npm start
```

This will start the **React frontend**, and it will be available at [http://localhost:4200](http://localhost:4200).

---

### **Step 3: Running MongoDB Locally**
If you're not using Docker for MongoDB, you’ll need to ensure **MongoDB** is installed and running on your machine. You can install MongoDB by following the official installation instructions for your operating system:

- [MongoDB Installation Guide](https://docs.mongodb.com/manual/installation/)

Once installed, start the **MongoDB** service:

```bash
sudo service mongod start
```

Alternatively, if you're using Docker, you can run MongoDB in a container as mentioned earlier.

---

### **Step 4: Connecting the Frontend and Backend**

The **React frontend** communicates with the **Rails backend** via HTTP requests (using **Axios**). The frontend makes requests to the API endpoints exposed by the backend to send and retrieve messages.

To ensure everything works:
- The **frontend** will interact with the backend running at [http://localhost:3000](http://localhost:3000).
- Make sure the backend is running before trying to interact with the frontend.

---

### **Step 5: Testing the Application**

Once both the **frontend** and **backend** are running locally, you can test the application by:
1. **Logging in** with valid user credentials (if implemented).
2. **Sending a message** via the message form.
3. **Viewing sent messages** in the message history page.

---

### **Step 6: Stopping the Services**

When you're done, you can stop the services:
- **Rails server**: Press `CTRL+C` in the terminal where the Rails server is running.
- **React server**: Press `CTRL+C` in the terminal where the React development server is running.
- **MongoDB**: If you started MongoDB locally, you can stop it with:
  ```bash
  sudo service mongod stop
  ```

If you're using **Docker** for MongoDB, stop the container with:
```bash
docker stop mongo
```

---

### **Final Notes**

Running **MySMS Messenger** without Docker involves manually setting up both the **frontend** and **backend**, ensuring that the necessary services (React, Rails, MongoDB) are running on your local machine. This setup can give you more control over each individual service and is ideal if you need to configure or debug them separately.

---
## Contact Me

- Email: code.mait@gmail.com
- [LinkedIn](https://www.linkedin.com)
- [GitHub](https://www.github.com)
