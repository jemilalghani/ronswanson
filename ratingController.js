module.exports = {
  getRatings: (req, res) => {
    req.app
      .get("db")
      .get_rating(req.params.quote)
      .then(ratings => {
        res.status(200).json(ratings);
      })
      .catch(error => {
        console.log("error in GET ratings", error);
      });
  },
  addRating: (req, res) => {
    req.app
      .get("db")
      .add_rating([req.body.quote, req.body.rating, req.body.ip])
      .then(ratings => {
        res.status(200).json(ratings);
      })
      .catch(error => {
        console.log("error in POST ratings", error);
      });
  },
  checkRating: (req, res) => {
    req.app
      .get("db")
      .check_rating([req.params.ip, req.params.quote])
      .then(ratings => {
        res.status(200).json(ratings);
      })
      .catch(error => {
        console.log("error in GET check", error);
      });
  }
};
