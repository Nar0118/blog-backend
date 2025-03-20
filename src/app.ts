import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from '../routes/userRoutes';
import postRoutes from '../routes/postRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Use the routes
app.use(userRoutes);
app.use(postRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
