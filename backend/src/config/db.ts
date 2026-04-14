import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';

dotenv.config();

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI || '';
        
        // If it's the placeholder URI, use an in-memory database so the app can run smoothly
        if (mongoUri.includes('<username>') || mongoUri === '') {
            console.log("Placeholder MongoDB URI detected! Starting an In-Memory Database...");
            const mongoServer = await MongoMemoryServer.create();
            const memoryUri = mongoServer.getUri();
            
            const conn = await mongoose.connect(memoryUri);
            console.log(`In-Memory MongoDB Connected: ${conn.connection.host}`);
            return;
        }

        const conn = await mongoose.connect(mongoUri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error: ${error.message}`);
        } else {
            console.error('An unknown error occurred during database connection');
        }
        process.exit(1);
    }
};

export default connectDB;
