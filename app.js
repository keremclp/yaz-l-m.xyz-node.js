require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// DB
const connectDB = require('./db/connect')

// middlewear
const { authenticateUser } = require("./middleware/authentication");

// rest of packages
const cookieParser = require('cookie-parser');

// routes
const authRoutes = require('./routes/auth')
const jobsRoutes = require('./routes/jobs')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
// extra packages

// routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/jobs', authenticateUser,jobsRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
