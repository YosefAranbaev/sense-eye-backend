const { Router } = require('express');
const { backendController } = require('../controllers/backendController');

const backendRouter = new Router();

backendRouter.get('/', backendController.singlePlayerMode)
//organizations
// backendRouter.get('/', backendController.singlePlayerMode)

module.exports = { backendRouter };