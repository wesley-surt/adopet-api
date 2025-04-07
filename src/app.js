import express from "express";
import routes from './routes/index.js';
import db from './config/dbConnect.js';

const app = express();

db.on('error', console.log.bind(console, 'connection failure'));
db.once('open', () => console.log('successful database connection'));


routes(app);

export default app;
