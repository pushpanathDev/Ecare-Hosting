const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token || token !== "Bearer 12345") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
};

module.exports = authenticateToken;
