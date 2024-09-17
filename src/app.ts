import express from 'express';
import path from 'path';
import router from './router/apiRouter';

const app: express.Application = express();

//Middleware

app.use(express.json());
app.use(express.static(path.join(__dirname, '../', 'public')));

//Router
app.use('/api/v1', router)

export default app;