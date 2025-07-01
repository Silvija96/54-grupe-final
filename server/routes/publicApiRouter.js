import express from 'express';
import { postRegister } from '../api/public/postRegister.js';
import { postLogin } from '../api/public/postLogin.js';
import { getLogin } from '../api/public/getLogin.js';
import { getAllCategories } from '../api/public/getAllCategories';
import { getFeaturedCategories } from '../api/public/getFeaturedCategories';

export const publicApiRouter = express.Router();

publicApiRouter.post('/register', postRegister);
publicApiRouter.post('/login', postLogin);
publicApiRouter.get('/login', getLogin);

publicApiRouter.get('/categories', getAllCategories);
publicApiRouter.get('/categories/featured', getFeaturedCategories);