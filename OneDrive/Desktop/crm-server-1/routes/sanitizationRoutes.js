// routes/sanitizationRoutes.js
import express from 'express';
import { handleSanitizeSubdomain } from '../controllers/sanitizationController.js';
import { validateSubdomainInput } from '../middleware/validateInput.js';

const router = express.Router();

router.post('/sanitize-subdomain', validateSubdomainInput, handleSanitizeSubdomain);

export default router;
