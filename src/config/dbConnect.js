import mongoose from 'mongoose';
import { environment } from '../../environment/env.js';

const dbPassword = environment.DB_PASSWORD;
const dbUser = environment.DB_USER;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0-adopet.ntedr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0-Adopet`);

let db = mongoose.connection;

export default db;
