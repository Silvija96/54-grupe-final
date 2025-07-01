import express from 'express';
import { postRegister } from '../api/public/postRegister.js';
import { postLogin } from '../api/public/postLogin.js';
import { getLogin } from '../api/public/getLogin.js';
import { getAllCategories } from '../api/public/getAllCategories.js';
import { getFeaturedCategories } from '../api/public/getFeaturedCategories.js';
import { getAllMovies } from '../api/public/getAllMovies.js';

export const publicApiRouter = express.Router();

publicApiRouter.post('/register', postRegister);
publicApiRouter.post('/login', postLogin);
publicApiRouter.get('/login', getLogin);

publicApiRouter.get('/categories', getAllCategories);
publicApiRouter.get('/categories/featured', getFeaturedCategories);

publicApiRouter.get('/movies', getAllMovies);