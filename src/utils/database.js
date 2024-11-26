import dotenv from 'dotenv';
import path from 'path';
import pkg from 'pg';
const { Client } = pkg;

const __dirname = path.resolve();
dotenv.config({ path: path.join(__dirname, '.env') });

const { PG_USER, PG_PASSWORD, PG_HOST, PG_PORT, PG_DATABASE } = process.env;

const dbConfig = {
    user: PG_USER,
    password: PG_PASSWORD,
    host: PG_HOST,
    port: parseInt(PG_PORT, 10),
    database: PG_DATABASE
};

const client = new Client(dbConfig);

const connectToDatabase = async () => {
    try {
        await client.connect();
        console.log('Connected successfully to the database');
    } catch (error) {
        console.error('Connection failed:', error);
    }
};

connectToDatabase();

export default client;