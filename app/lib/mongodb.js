import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
const conn = {
    isConnected: false
};

export async function connectDb() {
    if (conn.isConnected) return;//comprueba si ya está conectado

    try {
        const db = await mongoose.connect(uri)
        console.log(db.connection.db.databaseName);
        conn.isConnected = db.connections[0].readyState;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected');
});

mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error:', err);
});
