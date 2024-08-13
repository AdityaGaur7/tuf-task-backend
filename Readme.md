
# Flashcard Learning Tool Backend

This is the backend API for the Flashcard Learning Tool, built using Node.js, Express, and MySQL. The API provides endpoints for managing flashcards, including creating, reading, updating, and deleting flashcards.

## Features

- **Express.js**: Handles the routing and middleware.
- **MySQL**: Used as the relational database to store flashcards.
- **CORS**: Enables cross-origin requests.
- **Body-Parser**: Parses incoming JSON requests.

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (v12.x or later)
- **MySQL** (v5.7 or later)
- **npm** (v6.x or later)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd flashcard-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file in the root directory and add the following environment variables:**
   ```env
   PORT=5000
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   DB_PORT=your_database_port
   ```

4. **Set up your MySQL database:**
   - Create a MySQL database.
   - Create a table named `flashcards` with the following schema:
     ```sql
     CREATE TABLE flashcards (
         id INT AUTO_INCREMENT PRIMARY KEY,
         question VARCHAR(255) NOT NULL,
         answer TEXT NOT NULL
     );
     ```

### Running the Application

1. **Start the server:**
   ```bash
   npm start
   ```
   The server will start on the port specified in the `.env` file (default: 5000).

2. **API Endpoints:**

   - **GET /api/flashcards**
     - Retrieves all flashcards from the database.
   - **POST /api/flashcards**
     - Creates a new flashcard.
     - **Body**:
       ```json
       {
           "question": "What is Node.js?",
           "answer": "Node.js is a JavaScript runtime built on Chrome's V8 engine."
       }
       ```
   - **PUT /api/flashcards/:id**
     - Updates an existing flashcard by its ID.
     - **Body**:
       ```json
       {
           "question": "What is Express.js?",
           "answer": "Express.js is a web application framework for Node.js."
       }
       ```
   - **DELETE /api/flashcards/:id**
     - Deletes a flashcard by its ID.

3. **Test the API:**
   - You can use tools like [Postman](https://www.postman.com/) to test the API endpoints.

### Deployment

To deploy this application, you can use services like [Heroku](https://www.heroku.com/), [AWS](https://aws.amazon.com/), or any other cloud provider that supports Node.js applications.

### Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request with your changes.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```

Replace `<repository-url>` with your actual GitHub repository URL if applicable. This README provides clear instructions on setting up, running, and using the API, along with the necessary environment configuration.