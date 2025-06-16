import { sanitizeSubdomain } from '../lib/sanitization/sanitizeSubdomain.js';
import db from '../config/db.js';

export const registerCompany = async (req, res) => {
  try {
    const { name, subdomain } = req.body;
    const cleanSubdomain = sanitizeSubdomain(subdomain);

    // Check for duplicate subdomain
    const [existing] = await db.execute(
      'SELECT * FROM companies WHERE subdomain = ?',
      [cleanSubdomain]
    );

    if (existing.length > 0) {
      return res.status(409).json({ error: 'Subdomain already exists' });
    }

    // Insert into database
    await db.execute(
      'INSERT INTO companies (name, subdomain) VALUES (?, ?)',
      [name, cleanSubdomain]
    );

    res.status(201).json({
      message: 'Company registered successfully',
      sanitized: cleanSubdomain,
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
