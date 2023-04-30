const { Router } = require('express');
const { statisticsController } = require('../controllers/statisticsController');

const statisticsRouter = new Router();
statisticsRouter.get('/', statisticsController.getAllstatistics);
statisticsRouter.get('/:gameID', statisticsController.getstatisticsByGameID);
statisticsRouter.post('/', statisticsController.addstatistic);

module.exports = { statisticsRouter };