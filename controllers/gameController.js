const Game = require('../model/game');

exports.gameController = {
  getAllGames(req, res) {
    Game.find({})
      .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
      })
      .catch(err => {
        res.status(400);
        res.json(`Error getting data from db: ${err}`);
      });
  },

  getGameBytimeStamp(req, res) {
    const timestamp = req.params.timestamp;
    Game.findOne({ timestamp: timestamp })
      .then(doc => {
        console.log(doc);
        if (!doc) {
          res.status(404);
          res.json(`Game with timestamp ${timestamp} not found`);
        } else {
          res.status(200);
          res.json(doc);
        }
      })
      .catch(err => {
        res.status(400);
        res.json(`Error getting data from db: ${err}`);
      });
  },

  addGame(req, res) {
    const { timestamp, mode, orgName } = req.body;
    if (!timestamp || !mode || !orgName) {
      res.status(400);
      res.json(`Missing required fields`);
      return;
    }
    const newGame = new Game({
      timestamp,
      mode,
      orgName
    });

    newGame
      .save()
      .then(doc => {
        console.log(doc);
        res.status(201);
        res.json(doc);
      })
      .catch(err => {
        res.status(400);
        res.json(`Error saving data to db: ${err}`);
      });
  }
};
