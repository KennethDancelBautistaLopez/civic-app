import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './Routes/authRoutes.js';  // Ensure the `.js` extension is correct for ES Modules
import eventRoutes from './Routes/eventRoutes.js';  // Same as above
import contentRoutes from './Routes/contentRoute.js';
import simulationRoutes from './Routes/simulationRoutes.js';
import newsRoutes from './Routes/newsRoutes.js';
import quizRoutes from './Routes/quizRoutes.js';
import analysisRoutes from './Routes/analyticsRoutes.js';


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());  // Parses incoming JSON requests
app.use(express.json());  // For parsing application/json requests

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);  // Auth routes or user routes
app.use('/api/event', eventRoutes);      // Event routes
app.use('/api/content', contentRoutes); // content routes
app.use('/api/simulation', simulationRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/analysis', analysisRoutes);


// Sample route
app.get('/', (req, res) => {
  res.send('Civic Engagement App API');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
