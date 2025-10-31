exports.getProtectedData = (req, res) => {
  res.status(200).json({
    message: "✅ You accessed a protected route!",
    user: req.user
  });
};