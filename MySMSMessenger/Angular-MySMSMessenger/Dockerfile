# Step 1: Use the official Node.js image
FROM node:18

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json first for efficient caching
COPY package.json package-lock.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the entire project into the container
COPY . .

# Step 6: Expose port 4200 so that Angular can run on that port
EXPOSE 4200

# Step 7: Start the Angular app using `ng serve`
CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]
