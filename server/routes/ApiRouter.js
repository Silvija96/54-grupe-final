import express from 'express';
import { getAllCategories } from '../api/getAllCategories.js';
import { getFeaturedCategories } from '../api/getFeaturedCategories.js';
import { getAllMovies } from '../api/getAllMovies.js';
import { getMovieBySlug } from '../api/getMovieBySlug.js';
import { getMoviesByCategory } from '../api/getMoviesByCategory.js';
import { postRegister } from '../api/postRegister.js';
import { postLogin } from '../api/postLogin.js';

export const apiRouter = express.Router();

apiRouter.post('/register', postRegister);
apiRouter.post('/login', postLogin);

apiRouter.get('/categories', getAllCategories);
apiRouter.get('/categories/featured', getFeaturedCategories);

apiRouter.get('/movies', getAllMovies);
apiRouter.get('/movies/:slug', getMovieBySlug);

apiRouter.get('/movies-by-category/:slug', getMoviesByCategory);

apiRouter.all('*error', (req, res) => {
    return res.status(404).json({
        status: 'error',
        msg: 'No such API route exists',
    })
});