// controllers/sanitizeController.js
import { sanitizeSubdomain } from '../lib/sanitization/sanitizeSubdomain.js';

export const handleSanitizeSubdomain = async (req, res) => {
  try {
    const { subdomain } = req.body;
    const sanitized = sanitizeSubdomain(subdomain);

    return res.status(200).json({ sanitized });
  } catch (error) {
    console.error('Sanitize Error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};
