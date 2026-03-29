import express from 'express';
import { isAuth, login, logout, register } from '../controllers/userController.js';
import authUser from '../middlewears/authUser.js';

const userRoutes = express.Router();

userRoutes.post('/register', register);
userRoutes.post('/login', login);
userRoutes.get('/is-auth', authUser , isAuth);
userRoutes.post('/logout', authUser, logout);

export default userRoutes;