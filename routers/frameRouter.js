const { Router } = require('express');
const { frameController } = require('../controllers/frameController');

const frameRouter = new Router();

frameRouter.get('/', frameController.getAllFrames);
frameRouter.post('/', frameController.createNewFrame);
frameRouter.get('/:getFrameByOrgName', frameController.getFrameByOrgName);


module.exports = { frameRouter };