function getUserById(req, res) {
  const { userId } = req.params;

  res.status(200).json({
    id: userId,
    message: 'User route is ready for future implementation',
  });
}

module.exports = {
  getUserById,
};
