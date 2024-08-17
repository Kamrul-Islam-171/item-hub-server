# ItemHub

## Project Setup

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)
- A Vercel account for deployment.

### Installation

1. **Clone the Repository**:
   ```bash
   cd ItemHub-Server
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   - Create a `.env` file in the root directory and add your environment variables:
     ```
     DB_USER=your_mongodb_user
     DB_PASS=your_mongodb_pass
     ACCESS_TOKEN_SECRET=your_secret_key
     ```

4. **Start the Server**:
   ```bash
   npm start
   ```

5. **Test the Server**:
   - The server should be running on `http://localhost:5000`.

## Technologies Used

- **Backend**: Express.js, Node.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
