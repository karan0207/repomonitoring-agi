import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

import repoRoutes from './routes/repo';
import runRoutes from './routes/runs';

app.use(cors());
app.use(express.json());

app.use('/api/repo', repoRoutes);
app.use('/api/runs', runRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
    console.log(`Backend server running on port ${port}`);
});
