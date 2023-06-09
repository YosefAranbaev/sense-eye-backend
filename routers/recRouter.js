const { Router } = require('express');
const { recController } = require('../controllers/recController');

const recRouter = new Router();
recRouter.get('/', recController.getAllrecomendations);
recRouter.get('/:gameID', recController.getUserByGameID);
recRouter.get('/chart/:gameID', recController.getChart);
recRouter.get('/:orgName', recController.getRecByOrgName);
recRouter.post('/', recController.addrecomendation);
recRouter.post('/:recId', recController.updateStatusByRecId);


module.exports = { recRouter };