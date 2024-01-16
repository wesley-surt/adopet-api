import mongoose from 'mongoose';
import { environment } from '../../environment/env.js';

const dbPassword = environment.DB_PASSWORD;
const dbUser = environment.DB_USER;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.0uuwmvs.mongodb.net/adopet`);

let db = mongoose.connection;

export default db;
