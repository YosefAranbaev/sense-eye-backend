const { Router } = require('express');
const { userController } = require('../controllers/userController');
const userRouter = new Router();

userRouter.get('/', userController.getAllUsers);
userRouter.get('/:email', userController.getUserByEmail);
userRouter.post('/', userController.addUser); // Add this line to create the new route
userRouter.post('/login', userController.loginUser); // Add this line to create the new route
module.exports = { userRouter };
