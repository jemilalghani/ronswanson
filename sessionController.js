module.exports = {
  getIP: (req, res) => {
    res.json(req.ip);
  }
};
