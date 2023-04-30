const axios = require('axios');
const Rec = require('../model/recomendation');

exports.recController = {
  getAllrecomendations(req, res) {
    Rec.find({})
      .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
      })
      .catch(err => {
        res.status(400);
        res.json(`Error getting data from db: ${err}`);
      });
  },

  getUserByGameID(req, res) {
    const gameID = req.params.gameID;
    Rec.findOne({ gameID })
      .then(doc => {
        console.log(doc);
        if (!doc) {
          res.status(404);
          res.json(`Recommendation with gameID ${gameID} not found`);
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

  addrecomendation(req, res) {
    const { status, frame, orgName, gameID } = req.body;

    if (!status || !frame || !orgName || !gameID) {
        if (!status) {
            console.log('status');
        }
        if (!frame) {
            console.log('frame');
        }
        if (!orgName) {
            console.log('orgName');
        }
        if (!gameID) {
            console.log('gameID');
        }
        res.status(400);
        return res.json(`Missing required parameter(s) in request body`);
    }
    const newRec = new Rec({
      status,
      frame,
      orgName,
      gameID,
    });

    newRec
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
  },
  getRecByOrgName(req, res) {
    const orgName = req.params.orgName;
    Rec.find({ orgName: orgName })
      .then(docs => {
        console.log(docs);
        if (docs.length === 0) {
          res.status(404);
          res.json(`No recomendations found for organization with name ${orgName}`);
        } else {
          res.status(200);
          res.json(docs);
        }
      })
      .catch(err => {
        res.status(400);
        res.json(`Error getting data from db: ${err}`);
      });
}
};
