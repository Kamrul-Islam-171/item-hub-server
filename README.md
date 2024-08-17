# ItemHub


This repository contains the server-side code for the ItemHub e-commerce website, focusing on handling API requests, user authentication, and database operations.

## Server Deployment Steps

### 1. Comment Await Commands to Solve Gateway Timeout Error

In order to prevent gateway timeout errors during server deployment, comment out the following `await` commands outside of your API methods:

```js
// Comment out the following commands
// await client.connect();
// await client.db("admin").command({ ping: 1 });
```

### 2. Create `vercel.json` File for Server Configuration

Create a `vercel.json` file in the root of your server directory to configure the deployment on Vercel:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "index.js",
      "methods": ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
    }
  ]
}
```

### 3. Update CORS Configuration

Add your production domains to the CORS configuration. Replace the URLs provided inside the origin array with your own production URLs:

```js
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-production-domain1.com",
      "https://your-production-domain2.com",
    ],
    credentials: true,
  })
);
```

**Note**: Ensure that you remove the trailing `/` from your production URLs.



### 4. Deploy to Vercel

Deploy your server to Vercel using the following commands:

```bash
vercel
vercel --prod
```

After deployment:
- Click on the inspect link to get your production domain.
- Set up your environment variables in Vercel.
- Test your public API to ensure everything is working correctly.

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
   git clone https://github.com/tazim5032/diverse-deal-server.git
   cd DiverseDeal-Server
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   - Create a `.env` file in the root directory and add your environment variables:
     ```
     MONGO_URI=your_mongo_db_connection_string
     PORT=5000
     ACCESS_TOKEN_SECRET=your_secret_key
     NODE_ENV=development
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
