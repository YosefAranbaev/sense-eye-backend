const { Router } = require('express');
const { orgController } = require('../controllers/orgController');

const orgRouter = new Router();

//organizations
orgRouter.get('/', orgController.getAllorganizations)
orgRouter.get('/:name',orgController.getOrgByName);
orgRouter.post('/',orgController.addOrg);
module.exports = { orgRouter };