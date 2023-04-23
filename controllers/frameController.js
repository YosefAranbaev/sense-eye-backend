const Frame = require('../model/frame');

exports.frameController = {
  getAllFrames(req, res) {
    Frame.find({})
      .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
      })
      .catch(err => {
        res.status(400);
        res.json(`Error getting data from db: ${err}`);
      });
  },

  createNewFrame(req, res) {
    const { heatmap, traces, orgName, gameID } = req.body;
    if (!heatmap || !traces || !orgName || !gameID) {
      res.status(400);
      res.json(`Missing required fields`);
      return;
    }
    const newFrame = new Frame({
      heatmap,
      traces,
      orgName,
      gameID
    });

    newFrame
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

  getFrameByOrgName(req, res) {
    const orgName = req.params.getFrameByOrgName;
    Frame.find({ orgName: orgName })
      .then(docs => {
        console.log(docs);
        if (!docs || docs.length === 0) {
          res.status(404);
          res.json(`Frames with orgName ${orgName} not found`);
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
