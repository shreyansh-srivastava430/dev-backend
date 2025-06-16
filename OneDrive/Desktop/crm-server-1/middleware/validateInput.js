export const validateCompanyInput = (req, res, next) => {
  const { name, subdomain } = req.body;

  if (!name || !subdomain) {
    return res.status(400).json({ error: 'Name and subdomain are required' });
  }

  if (typeof name !== 'string' || typeof subdomain !== 'string') {
    return res.status(400).json({ error: 'Name and subdomain must be strings' });
  }

  next(); // ✅ continue to controller
};
