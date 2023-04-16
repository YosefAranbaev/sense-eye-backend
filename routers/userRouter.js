const { Router } = require('express');
const { userController } = require('../controllers/userController');

const userRouter = new Router();
userRouter.get('/', userController.getAllusers);
userRouter.get('/:email', userController.getUserByEmail);
userRouter.post('/', userController.addUser);


module.exports = { userRouter };