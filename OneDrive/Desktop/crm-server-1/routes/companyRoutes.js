import express from 'express';
import { registerCompany } from '../controllers/companyController.js';
import { validateCompanyInput } from '../middleware/validateInput.js'; // ✅ import

const router = express.Router();

router.post('/register-company', validateCompanyInput, registerCompany); // ✅ use middleware here

export default router;
