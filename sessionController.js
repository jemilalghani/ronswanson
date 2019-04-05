module.exports = {
  getIP: (req, res) => {
    console.log(
      (
        req.headers["X-Forwarded-For"] ||
        req.headers["x-forwarded-for"] ||
        ""
      ).split(",")[0] || req.client.remoteAddress
    );
  }
};
