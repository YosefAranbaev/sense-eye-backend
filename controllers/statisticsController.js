const Statistics = require('../model/statistics');

exports.statisticsController = {
  getAllstatistics(req, res) {
    Statistics.find({})
      .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
      })
      .catch(err => {
        res.status(400);
        res.json(`Error getting data from db: ${err}`);
      });
  },

  getstatisticsByGameID(req, res) {
    const gameID = req.params.gameID;
    Statistics.find({ gameID: gameID })
      .then(doc => {
        console.log(doc);
        if (!doc) {
          res.status(404);
          res.json(`Statistics with game ID ${gameID} not found`);
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

  addstatistic(req, res) {
    const { frame, orgName, gameID } = req.body;
    if (!frame || !orgName || !gameID) {
      res.status(400);
      res.json(`Missing required fields`);
      return;
    }
    const newStatistic = new Statistics({
      frame,
      orgName,
      gameID
    });

    newStatistic
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
