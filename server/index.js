import express from 'express';
import { apiRouter } from './routes/ApiRouter.js';

const app = express();
const PORT = 5417;

app.use(express.static('public'));

app.use('/api', apiRouter);

app.get('*error', (req, res) => {
    return res.status(404).json({
        status: 'error',
        msg: 'No such route',
    });
});

app.listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT}`);
});