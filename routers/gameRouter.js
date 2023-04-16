const { Router } = require('express');
const { gameController } = require('../controllers/gameController');

const gameRouter = new Router();

//organizations
gameRouter.get('/', gameController.getAllGames)
gameRouter.get('/:timestamp',gameController.getGameBytimeStamp);
gameRouter.post('/',gameController.addGame);
module.exports = { gameRouter };