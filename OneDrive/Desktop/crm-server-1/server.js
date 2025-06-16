import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import companyRoutes from './routes/companyRoutes.js';
import sanitizationRoutes from './routes/sanitizationRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use('/api', companyRoutes);
app.use('/api', sanitizationRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
