import express from "express";
import routes from './routes/index.js';
import db from './config/dbConnect.js';

db.on('error', console.log.bind(console, 'connection failure'));
db.once('open', () => console.log('successful database connection'));

const app = express();

routes(app);

export default app;
