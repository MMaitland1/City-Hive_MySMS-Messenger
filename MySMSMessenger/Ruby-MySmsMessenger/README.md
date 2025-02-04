# **MySMS Messenger - Ruby On Rails Back End**

### 1. **Role of the backend in the application**
The backend of MySMS Messenger plays a crucial role in handling the core operations that power the app's features. It serves as the intermediary between the front-end user interface and the necessary external services such as Twilio for SMS handling and MongoDB for storing user data. The backend performs tasks like:

- **User authentication**: Handling user registration and login via JWT tokens, ensuring that only authorized users can send or view messages.
- **Message management**: It processes sending, retrieving, and deleting SMS messages through Twilio.
- **Database interaction**: It manages user data (including user identifiers and message history) using MongoDB, ensuring data persistence.
- **Business logic**: It houses the logic for phone number validation, SMS transmission, and tracking of message statuses, abstracting away complexity from the front end.

### 2. **Key backend features (Twilio integration, MongoDB storage, JWT authentication)**

1. **Twilio Integration**:
   - Twilio is a cloud communications platform that enables the backend to send and receive SMS messages.
   - In the backend, Twilio handles the actual sending of SMS messages. The `twilio_service.rb` file contains all the business logic needed to interface with the Twilio API. It ensures that the phone number is valid, sends the SMS, and tracks the delivery status.
   - Twilio also manages other features such as message status updates (e.g., delivered, failed), which is integrated into the backend to keep the user informed about the status of each message.

2. **MongoDB Storage**:
   - MongoDB is used as the database for storing user and message data. It is a NoSQL database that is flexible and scalable, perfect for handling dynamic and large amounts of data.
   - Mongoid, an ODM (Object Document Mapper) for Ruby on Rails, is used to interact with MongoDB. It allows you to map your Ruby objects (models like `User` and `Message`) to MongoDB documents.
   - The `User` model contains user-specific data, and each `Message` is associated with a user. MongoDB is well-suited for this type of relationship because it stores data in JSON-like structures.

3. **JWT Authentication**:
   - JSON Web Tokens (JWT) are used for user authentication. Instead of using sessions, the backend generates a token after a successful login, which the client (usually the frontend) stores and sends with each request to prove the user’s identity.
   - The backend validates the JWT with every protected API request, ensuring the requester is authenticated. This approach is stateless, meaning the server doesn’t need to store any session data.
   - The `JWT_SECRET_KEY` environment variable stores the secret key used to sign and verify tokens.

### 3. **Technology Stack**

- **Core Framework: Ruby on Rails (API mode)**:
   - Ruby on Rails (Rails) is a full-stack web framework, and in the context of MySMS Messenger, it is used in **API mode**. This means the application is built solely to serve APIs (no front-end views are rendered by the server).
   - Rails provides a strong convention-over-configuration philosophy, making it quick to build applications. For MySMS Messenger, it handles routing, request-response cycles, and helps structure your API logic, which is essential for serving endpoints like user authentication and message handling.
   - Rails also has great integration with testing tools (like RSpec) and offers features such as ActiveRecord for ORM (though we're using Mongoid for MongoDB, Rails' ActiveRecord-inspired methods remain useful).

- **Database: MongoDB (with Mongoid ODM)**:
   - MongoDB is a NoSQL database designed to handle a large scale of unstructured data, which makes it ideal for fast development and high-performance applications.
   - Mongoid is the Ruby ODM (Object-Document Mapper) for MongoDB, enabling Ruby applications to interact with MongoDB in an object-oriented way. It allows models like `User` and `Message` to be treated as Ruby objects, while Mongoid takes care of converting them into documents stored in MongoDB.
   - MongoDB is used to store user data, message content, and other records. The flexibility of MongoDB's schema-less structure is particularly beneficial in cases where data requirements might change over time.

- **SMS Service: Twilio API**:
   - Twilio provides an API that facilitates communication services, particularly for SMS and voice. This integration is at the heart of the backend, as it handles sending SMS messages, validating phone numbers, and managing message statuses.
   - The backend interacts with Twilio’s REST API, sending HTTP requests to Twilio’s endpoints to transmit messages to users. It also tracks the status of each message sent through Twilio, helping the backend log successes or failures in message delivery.
   - Integration with Twilio is handled in `twilio_service.rb`, which encapsulates all necessary logic for dealing with the Twilio API.

- **Authentication: JWT (JSON Web Tokens)**:
   - JWT is used for securing communication between the backend and the frontend, allowing stateless user authentication.
   - When a user logs in, the backend generates a JWT that encodes user information (e.g., user ID), which is signed with a secret key.
   - The JWT is included in HTTP requests (usually in the `Authorization` header) when the client interacts with protected resources (e.g., sending messages). The backend validates the token to ensure the user is authorized to perform the action.

### 4. **API Endpoints**

In MySMS Messenger, the backend exposes several key API endpoints for handling authentication and managing SMS messages. Here’s a detailed breakdown of each endpoint:

#### **Authentication Endpoints**:
These endpoints handle user registration and login, enabling users to authenticate and interact with the system.

- **POST /signup**: 
   - **Description**: This endpoint allows users to register by creating a new account. Upon successful registration, the backend will generate and return a JWT token, which can then be used for authenticated requests.
   - **Request Body**: 
     ```json
     {
       "username": "john_doe",
       "password": "password123"
     }
     ```
   - **Response**: 
     ```json
     {
       "message": "User created successfully",
       "token": "JWT_token_here"
     }
     ```
   - **Status Codes**: 
     - `201 Created`: When the user is successfully registered.
     - `400 Bad Request`: When required fields are missing or the user already exists.

- **POST /login**: 
   - **Description**: This endpoint authenticates a user with their username and password. If authentication is successful, it returns a JWT token for the user.
   - **Request Body**: 
     ```json
     {
       "username": "john_doe",
       "password": "password123"
     }
     ```
   - **Response**: 
     ```json
     {
       "message": "Login successful",
       "token": "JWT_token_here"
     }
     ```
   - **Status Codes**:
     - `200 OK`: When login is successful and the token is returned.
     - `401 Unauthorized`: If the credentials are incorrect.

#### **Messages Endpoints**:
These endpoints handle the core functionality of sending, retrieving, and deleting SMS messages.

- **POST /messages**:
   - **Description**: This endpoint allows users to send SMS messages through the Twilio API. It takes the recipient’s phone number and the message content as input and uses Twilio to send the SMS.
   - **Request Body**:
     ```json
     {
       "recipient": "+1234567890",
       "content": "Hello from MySMS Messenger!"
     }
     ```
   - **Response**:
     ```json
     {
       "message": "Message sent successfully"
     }
     ```
   - **Status Codes**:
     - `200 OK`: When the message is successfully sent.
     - `400 Bad Request`: If the request body is incomplete or invalid.

- **GET /messages**:
   - **Description**: Retrieves the message history for the authenticated user. This endpoint returns a list of all the messages sent by the user.
   - **Response**:
     ```json
     [
       {
         "recipient": "+1234567890",
         "content": "Hello!",
         "sent_at": "2025-02-04T12:00:00Z"
       },
       {
         "recipient": "+9876543210",
         "content": "Hi again!",
         "sent_at": "2025-02-04T13:00:00Z"
       }
     ]
     ```
   - **Status Codes**:
     - `200 OK`: Returns a list of messages.
     - `401 Unauthorized`: If the user is not authenticated.

- **GET /messages/:user**:
   - **Description**: Retrieves the message history for a specific user, identified by their username hash.
   - **Response**:
     ```json
     [
       {
         "recipient": "+1234567890",
         "content": "Message content here",
         "sent_at": "2025-02-04T12:00:00Z"
       }
     ]
     ```
   - **Status Codes**:
     - `200 OK`: When the messages for the user are found and returned.
     - `404 Not Found`: If the user does not exist.

- **DELETE /messages/:user**:
   - **Description**: Deletes all messages for a specific user, identified by their username hash.
   - **Response**:
     ```json
     {
       "message": "Messages deleted successfully"
     }
     ```
   - **Status Codes**:
     - `200 OK`: When the messages are successfully deleted.
     - `404 Not Found`: If the user does not exist.

### 5. **Containerization: Docker**

Containerization ensures that the backend and its dependencies are bundled in a portable, consistent environment. Docker is used to package the MySMS Messenger backend into containers, which can run anywhere Docker is supported (e.g., local machines, cloud environments).

#### **Docker**:
- **What is Docker?**  
  Docker is a platform for developing, shipping, and running applications in isolated environments called containers. Containers are lightweight, portable, and include everything the application needs to run, such as libraries, dependencies, and environment variables.
  
- **Why use Docker in MySMS Messenger?**  
  Docker provides consistency between development and production environments. The backend (Ruby on Rails, MongoDB, etc.) is encapsulated inside a container, ensuring it will run the same way on any system, reducing the “it works on my machine” problem. It also simplifies deployment to production environments like AWS or any server that supports Docker.

#### **Docker Compose**:
- **What is Docker Compose?**  
  Docker Compose is a tool for defining and running multi-container Docker applications. In the case of MySMS Messenger, Docker Compose is used to set up multiple services, such as the backend API (Ruby on Rails) and MongoDB, in isolated containers that can communicate with each other.
  
- **How is it used in MySMS Messenger?**
  The `docker-compose.yml` file defines the services and their configurations. It includes the backend API and the MongoDB container, making it easy to start both services together with one command.

  Example `docker-compose.yml` file:
  ```yaml
  version: "3.8"
  services:
    backend:
      build: ./Ruby-MySMSMessenger
      ports:
        - "3000:3000"
      environment:
        - TWILIO_ACCOUNT_SID=${TWILIO_ACCOUNT_SID}
        - MONGO_URI=mongodb://mongo:27017/mysmsmessenger
      depends_on:
        - mongo

    mongo:
      image: mongo:latest
      ports:
        - "27017:27017"
      volumes:
        - mongo_data:/data/db

  volumes:
    mongo_data:
  ```

  - The **backend** service builds the backend from the `Dockerfile` in the `Ruby-MySMSMessenger` directory. It exposes port 3000, where the Rails server runs.
  - The **mongo** service uses the official MongoDB Docker image, exposing port 27017 for database access.
  - The `depends_on` directive ensures that MongoDB starts before the backend.

#### **Building and Running Containers**:
- **Building containers**:
  ```bash
  docker-compose build
  ```
  This command builds the images defined in the `docker-compose.yml` file. It will install any dependencies and prepare the environment for the containers.

- **Starting the services**:
  ```bash
  docker-compose up
  ```
  This command starts both the backend and MongoDB services. Docker will pull the necessary images if they don’t exist locally and then start the containers.

- **Stopping the services**:
  ```bash
  docker-compose down
  ```
  Stops and removes all running containers defined in the `docker-compose.yml` file.

#### **Benefits of Using Docker for MySMS Messenger**:
- **Portability**: Docker containers can run on any machine with Docker installed, ensuring that the environment is consistent regardless of where it’s deployed.
- **Isolation**: Each service (e.g., backend API, MongoDB) runs in its container, isolated from others. This makes it easier to manage dependencies and avoid conflicts.
- **Simplified Deployment**: With Docker, you can easily deploy MySMS Messenger to cloud environments or local servers without worrying about configuration differences between environments.
  

### 6. **Project Structure (Backend)**

The project structure organizes the backend code into a logical and maintainable format. Here's a breakdown of how the MySMS Messenger backend is structured:
```
Ruby-MySMSMessenger/
├── app/                                             # Rails application
│   ├── controllers/                                 # Rails controllers
│   │   ├── application_controller.rb                # Base controller
│   │   ├── home_controller.rb                       # Home controller
│   │   ├── messages_controller.rb                   # Messages controller
│   │   ├── users_controller.rb                      # Users controller
│   ├── models/                                      # Rails models
│   │   ├── message.rb                               # Message model
│   │   ├── user.rb                                  # User model
│   ├── services/                                    # Services
│   │   └── twilio_service.rb                        # Twilio service for SMS handling
│   ├── views/                                       # Rails views
│   ├── config/                                      # Rails configuration
│   │   ├── environments/                            # Environment-specific configurations
│   │   │   ├── development.rb                       # Development environment config
│   │   │   ├── production.rb                        # Production environment config
│   │   │   ├── test.rb                              # Test environment config
│   │   ├── routes.rb                                # Routes configuration
├── Dockerfile                                        # Docker configuration for back-end
├── Gemfile                                           # Ruby project dependencies
├── Gemfile.lock                                      # Lock file for Ruby dependencies
└── README.md                                         # Back-end documentation
```

- **`app/`**: Contains the core application logic.
  - **`controllers/`**: Houses the API endpoint controllers that handle requests and responses.
    - `application_controller.rb`: The base controller that might contain common functionality for all controllers.
    - `messages_controller.rb`: Responsible for handling incoming requests related to messages, such as sending or retrieving messages.
    - `users_controller.rb`: Manages user-related requests like registration and login.
  - **`models/`**: Contains the database models which define the structure of the application's data.
    - `message.rb`: The model representing messages, including the fields like `content`, `recipient`, and `sent_at`.
    - `user.rb`: The model representing users, including fields like `username_hash` and associations with messages.
  - **`services/`**: Contains service classes responsible for business logic or interacting with external services like Twilio.
    - `twilio_service.rb`: Contains the logic to interact with the Twilio API, including sending SMS messages and validating phone numbers.
  - **`serializers/`**: (Optional, if used) Contains classes responsible for shaping the API responses into the desired format.
  
- **`config/`**: Contains the configuration files for the application.
  - `routes.rb`: Defines the routes for the API endpoints, mapping HTTP methods and URLs to controller actions.
  - `mongoid.yml`: Configures the MongoDB connection settings (e.g., URI, database name).
  - **`initializers/`**: (If needed) Contains files for initial setup, such as the configuration for Twilio or JWT authentication.

- **`spec/`**: (Optional, if tests are implemented) Contains the test suites for the application, often organized by the type of tests.
  - Tests for models, controllers, services, and integrations are typically placed here.

- **`Dockerfile`**: This file contains the instructions to build the backend container. It typically installs dependencies, sets up the environment, and configures the necessary steps to run the application inside a container.

- **`Gemfile`**: Specifies the Ruby gems (libraries) that the backend depends on, including Rails, Mongoid, JWT, RSpec, and other necessary gems for the application.

---

### 7. **Deployment**

The deployment process involves setting up and running the application in a production environment. This could either be with Docker or manually.

#### **With Docker**:
- **Building the containers**:
   - Use Docker Compose to build the application’s containers. This ensures that both the backend and MongoDB services are containerized and can be deployed seamlessly.
   - Command:
     ```bash
     docker-compose build
     ```

- **Starting the services**:
   - Once the containers are built, the services can be started together with:
     ```bash
     docker-compose up
     ```

   - This will start the backend service and the MongoDB service, ensuring that they’re both running and ready for use in production.

- **Stopping the services**:
   - To stop the containers, run:
     ```bash
     docker-compose down
     ```

#### **Manual Deployment**:
If you're deploying without Docker, you'll need to configure the production environment manually:

- **Production Database Configuration**: 
   - Update the `config/mongoid.yml` file with the correct MongoDB connection settings for the production environment.

- **Environment Variables**: 
   - Set the production environment variables (like Twilio credentials and JWT secrets) on the server or within the hosting environment.

- **Starting Rails Server**: 
   - In production, you need to start the Rails server manually with:
     ```bash
     RAILS_ENV=production rails s -p 3000
     ```
     This command starts the Rails server on port 3000 in production mode, serving the backend API.

---
## Contact Me

- Email: code.mait@gmail.com
- [LinkedIn](https://www.linkedin.com)
- [GitHub](https://www.github.com)
